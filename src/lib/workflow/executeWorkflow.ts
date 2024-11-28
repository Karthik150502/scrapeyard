import "server-only";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { ExecutionPhase } from "@prisma/client";
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from "@/types/workflow";
import { waitFor } from "../waitFor";
import { AppNode } from "@/types/appNode";
import { TaskRegistry } from "./task/registry";
import { ExecutorRegistry } from "./executor/registry";
import { Environment, ExecutionEnvironment } from "@/types/executor";
import { TaskParamType } from "@/types/task";
import { Browser, Page } from "puppeteer";
import { Edge } from "@xyflow/react";
import { LogCollector } from "@/types/log";
import { createLogCollector } from "../log";

export async function executeWorkflow(executionId: string) {
    const execution = await prisma.workFlowExecution.findUnique({
        where: {
            id: executionId
        },
        include: {
            workflow: true,
            phases: true
        }
    })
    if (!execution) {
        throw new Error("Execution not found");
    }

    const edges = JSON.parse(execution.definition).edges as Edge[]

    // TODO: Setup execution
    const environment: Environment = {
        phases: {}
    };


    // TODO: initialize the workflow execution.
    await initializeWorkflowExecution(executionId, execution.workflowId);

    // TODO: Initialize the phases status
    await intializePhaseStatuses(execution);



    let executionFailed = false;
    let creditsConsumed = 0;
    for (const phase of execution.phases) {

        // TODO: Execute each phase.
        const phaseExecution = await executeWorkflowPhase(phase, environment, edges, execution.userId);
        creditsConsumed += phaseExecution.creditsConsumed;
        if (!phaseExecution.success) {
            executionFailed = true;
            break;
        }
    }


    // TODO: Finalize the execution.
    await finalizeWorkflowExecution(executionId,
        execution.workflowId,
        executionFailed,
        creditsConsumed);

    // TODO: To clean up the environment.
    await cleanUpEnvironment(environment);
    revalidatePath("/workflow/run")

}


async function initializeWorkflowExecution(executionId: string, workflowId: string) {
    await prisma.workFlowExecution.update({
        where: {
            id: executionId
        },
        data: {
            startedAt: new Date(),
            status: WorkflowExecutionStatus.RUNNING,
        }
    })

    await prisma.workflow.update({
        where: {
            id: workflowId
        },
        data: {
            lastRunAt: new Date(),
            lastRunStatus: WorkflowExecutionStatus.RUNNING,
            lastRunId: executionId
        }
    })
}


async function intializePhaseStatuses(execution: any) {
    await prisma.executionPhase.updateMany({
        where: {
            id: {
                in: execution.phases.map((phase: any) => phase.id)
            }
        },
        data: {
            status: ExecutionPhaseStatus.PENDING
        }
    })
}

async function finalizeWorkflowExecution(executionId: string, workflowId: string, executionFailed: boolean, creditsConsumed: number) {
    const finalStatus = executionFailed ? WorkflowExecutionStatus.FAILED : WorkflowExecutionStatus.COMPLETED;

    await prisma.workFlowExecution.update({
        where: {
            id: executionId
        },
        data: {
            status: finalStatus,
            completedAt: new Date(),
            creditsConsumed
        }
    })

    await prisma.workflow.update({
        where: {
            id: workflowId,
            lastRunId: executionId
        },
        data: {
            lastRunStatus: finalStatus
        }
    }).catch(err => {
        // Ignore 
        // This means we have triggered other runs while an execution was running.
    });
}


async function executeWorkflowPhase(phase: ExecutionPhase, environment: Environment, edges: Edge[], userId: string) {
    const logCollector = createLogCollector()
    const startedAt = new Date();
    const node = JSON.parse(phase.node) as AppNode;

    setupEnvironmentForPhase(node, environment, edges)


    // Updating the phase status
    await prisma.executionPhase.update({
        where: {
            id: phase.id
        },
        data: {
            status: ExecutionPhaseStatus.RUNNING,
            startedAt,
            inputs: JSON.stringify(environment.phases[node.id].inputs)
        }
    })

    const creditsRequired = TaskRegistry[node.data.type].credits;
    console.log(`Executing phase: ${phase.name} with ${creditsRequired} credits.`);

    // Phase execution simulation
    // await waitFor(2);
    // const success = Math.random() < 0.9;


    // TODO: Decrement the credits from the user balance.
    let success = await decrementCredits(userId, creditsRequired, logCollector);
    let creditsConsumed = success ? creditsRequired : 0;
    if (success) {
        // We can execute the phase if the credits are sufficient.
        success = await executePhase(phase, node, environment, logCollector);
    }




    const outputs = environment.phases[node.id].outputs;
    await finalizePhase(phase.id, success, outputs, logCollector, creditsConsumed);
    return {
        success,
        creditsConsumed
    }
}


export async function finalizePhase(
    phaseid: string,
    success: boolean,
    outputs: any,
    logCollector: LogCollector,
    creditsConsumed: number
) {

    const finalStatus = success ? ExecutionPhaseStatus.COMPLETED : ExecutionPhaseStatus.FAILED;
    console.log("============================", finalStatus)
    await prisma.executionPhase.update({
        where: {
            id: phaseid
        },
        data: {
            status: finalStatus,
            completedAt: new Date(),
            outputs: JSON.stringify(outputs),
            creditsConsumed,
            executionLogs: {
                createMany: {
                    data: logCollector.getAll().map(log => ({
                        message: log.message,
                        timeStamp: log.timeStamp,
                        logLevel: log.level
                    }))
                }
            }
        }
    })
}


async function executePhase(phase: ExecutionPhase, node: AppNode, environment: Environment, logCollector: LogCollector): Promise<boolean> {

    const runFn = ExecutorRegistry[node.data.type];
    if (!runFn) {
        return false;
    }

    const executionEnvironment: ExecutionEnvironment<any> = createExecutionEnvironment(node, environment, logCollector);
    return await runFn(executionEnvironment);
}

function setupEnvironmentForPhase(node: AppNode, environment: Environment, edges: Edge[]) {
    environment.phases[node.id] = { inputs: {}, outputs: {} };
    const inputs = TaskRegistry[node.data.type].inputs;

    for (const input of inputs) {
        if (input.type === TaskParamType.BROWSER_INSTANCE) { continue; }
        const inputValue = node.data.inputs[input.name];
        if (inputValue) {
            environment.phases[node.id].inputs[input.name] = inputValue;
            continue;
        }

        // Get input value from the outputs in the environment.
        const connectedEdge = edges.find(e => e.target === node.id && e.targetHandle === input.name);
        if (!connectedEdge) {
            console.error(`Missing edge for the input: ${input.name}, node id: ${node.id}`);
            continue;
        }

        const outputValue = environment.phases[connectedEdge.source].outputs[connectedEdge.sourceHandle!]

        environment.phases[node.id].inputs[input.name] = outputValue;
    }
}


function createExecutionEnvironment(node: AppNode, environment: Environment, logCollector: LogCollector): ExecutionEnvironment<any> {
    return {
        getInput: (name: string) => environment.phases[node.id]?.inputs[name],
        setOutput: (name: string, value: string) => {
            environment.phases[node.id].outputs[name] = value;
        },
        getBrowser: () => environment.browser,
        setBrowser: (browser: Browser) => (environment.browser = browser),
        setPage: (page: Page) => (environment.page = page),
        getPage: () => environment.page,
        log: logCollector
    }
}


async function cleanUpEnvironment(env: Environment) {
    if (env.browser) {
        await env.browser
            .close()
            .catch(err => {
                console.error("Cannot close the browser, reason: " + err);
            });
    }
}


async function decrementCredits(
    userId: string,
    amount: number,
    logCollector: LogCollector
) {
    try {
        await prisma.userBalance.update({
            where: {
                userId: userId, credits: { gte: amount }
            },
            data: {
                credits: { decrement: amount }
            }
        })
        return true;
    } catch {
        logCollector.error("Insufficient balance.");
        return false;
    }
}