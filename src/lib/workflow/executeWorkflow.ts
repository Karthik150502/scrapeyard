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

    // TODO: Setup execution
    const environment: Environment = {
        phases: {

        }
    };


    // TODO: initialize the workflow execution.
    await initializeWorkflowExecution(executionId, execution.workflowId);

    // TODO: Initialize the phases status
    await intializePhaseStatuses(execution);

    let executionFailed = false;
    let creditsConsumed = 0;
    for (const phase of execution.phases) {
        await waitFor(3);
        // TODO: Consume credits
        // TODO: Execute each phase.
        const phaseExecution = await executeWorkflowPhase(phase, environment);
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
    revalidatePath("/workflow/run")

}


async function initializeWorkflowExecution(executionId: string, workflowId: string) {
    await prisma.workFlowExecution.update({
        where: {
            id: executionId
        },
        data: {
            startedAt: new Date(),
            status: WorkflowExecutionStatus.RUNNNING,
        }
    })

    await prisma.workflow.update({
        where: {
            id: workflowId
        },
        data: {
            lastRunAt: new Date(),
            lastRunStatus: WorkflowExecutionStatus.RUNNNING,
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
        // This means we have triggered other runs while an execution wa running.
    });
}


async function executeWorkflowPhase(phase: ExecutionPhase, environment: Environment) {
    const startedAt = new Date();
    const node = JSON.parse(phase.node) as AppNode;

    setupEnvironmentForPhase(node, environment)


    // Updating the phase status
    await prisma.executionPhase.update({
        where: {
            id: phase.id
        },
        data: {
            status: WorkflowExecutionStatus.RUNNNING,
            startedAt,
        }
    })

    const creditsRequired = TaskRegistry[node.data.type].credits;
    console.log(`Executing phase: ${phase.name} with ${creditsRequired} credits.`);

    // Phase execution simulation
    // await waitFor(2);
    // const success = Math.random() < 0.9;


    const success = await executePhase(phase, node, environment);

    // TODO: Decrement the credits from the user balance.


    await finalizePhase(phase.id, success);
    return {
        success,
    }
}


export async function finalizePhase(phaseid: string, success: boolean) {
    const finalStatus = success ? ExecutionPhaseStatus.COMPLETED : ExecutionPhaseStatus.FAILED;
    await prisma.executionPhase.update({
        where: {
            id: phaseid
        },
        data: {
            status: finalStatus,
            completedAt: new Date()
        }
    })
}


async function executePhase(phase: ExecutionPhase, node: AppNode, environment: Environment): Promise<boolean> {

    const runFn = ExecutorRegistry[node.data.type];
    if (!runFn) {
        return false;
    }

    const executionEnvironment: ExecutionEnvironment = createExecutionEnvironment(node, environment);
    return await runFn(executionEnvironment);
}

function setupEnvironmentForPhase(node: AppNode, environment: Environment) {
    environment.phases[node.id] = { inputs: {}, outputs: {} };
    const inputs = TaskRegistry[node.data.type].inputs;

    for (const input of inputs) {
        const inputValue = node.data.inputs[input.name];
        if (inputValue) {
            environment.phases[node.id].inputs[input.name] = inputValue;
            continue;
        }

        // Get input value from the outputs in the environment.

    }
}


function createExecutionEnvironment(node: AppNode, environment: Environment) {
    return {
        getInput: (name: string) => environment.phases[node.id]?.inputs[name],
    }
}