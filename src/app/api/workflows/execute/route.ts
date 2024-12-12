import prisma from "@/lib/prisma";
import { executeWorkflow } from "@/lib/workflow/executeWorkflow";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { ExecutionPhaseStatus, WorkflowExecutionPlanType, WorkflowExecutionStatus, WorkflowExecutionTrigger } from "@/types/workflow";
import { parseExpression } from "cron-parser";
import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

function isValidSecret(secret: string) {
    const API_SECRET = process.env.API_SECRET!;
    if (!API_SECRET) {
        return false;
    }
    try {
        const res = timingSafeEqual(Buffer.from(secret), Buffer.from(API_SECRET));
        return res;
    } catch (e) {
        return false;
    }
}
export async function GET(req: Request) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({
            error: "Unauthorized"
        }, {
            status: 401
        })
    }

    const secret = authHeader.split(" ")[1];
    if (!isValidSecret(secret)) {
        return NextResponse.json({
            error: "Unauthorized"
        }, {
            status: 401
        })
    }

    const { searchParams } = new URL(req.url);
    const workflowId = searchParams.get("workflowId") as string;
    if (!workflowId) {
        return NextResponse.json({
            error: "Bad Request",
        }, {
            status: 400
        })
    }

    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId
        }
    })
    if (!workflow) {
        return NextResponse.json({
            error: "Workflow not Found",
        }, {
            status: 404
        })
    }

    const executionPlan = JSON.parse(workflow.executionPlan!) as WorkflowExecutionPlanType;
    if (!executionPlan) {
        return NextResponse.json({
            error: "Execution plan not defined.",
        }, {
            status: 404
        })
    }

    try {
        const cron = parseExpression(workflow.cron!, { utc: true });
        const nextRunTime = cron.next().toDate();
        const execution = await prisma.workFlowExecution.create({
            data: {
                workflowId: workflow.id,
                userId: workflow.userId,
                definition: workflow.definition,
                status: WorkflowExecutionStatus.PENDING,
                startedAt: new Date(),
                trigger: WorkflowExecutionTrigger.CRON,
                phases: {
                    create: executionPlan.flatMap(phase => {
                        return phase.nodes.flatMap(node => {
                            return {
                                userId: workflow.userId,
                                status: ExecutionPhaseStatus.CREATED,
                                number: phase.phase,
                                node: JSON.stringify(node),
                                name: TaskRegistry[node.data.type].label,
                            }
                        })
                    })
                }
            }
        })
        await executeWorkflow(execution.id, nextRunTime);
        return new NextResponse(null, { status: 200 });
    } catch (e) {
        return NextResponse.json({
            error: "Internal server error.",
        }, {
            status: 500
        })
    }


}