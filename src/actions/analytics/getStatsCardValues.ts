"use server"
import { periodToDateRange } from "@/lib/helper/dates";
import prisma from "@/lib/prisma";
import { Period } from "@/types/analytics";
import { WorkflowExecutionStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";


const { COMPLETED, FAILED } = WorkflowExecutionStatus;

export async function getStatsCardsValues(period: Period) {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthenticated");
    };
    const dateRange = periodToDateRange(period);
    const executions = await prisma.workFlowExecution.findMany({
        where: {
            userId,
            startedAt: {
                gte: dateRange.startDate,
                lte: dateRange.endDate
            },
            status: {
                in: [COMPLETED, FAILED]
            }
        },
        select: {
            creditsConsumed: true,
            phases: {
                where: {
                    creditsConsumed: {
                        not: null
                    }
                },
                select: {
                    creditsConsumed: true
                }
            },

        }
    });




    const stats = {
        worflowExecutions: executions.length,
        creditsConsumed: 0,
        phaseExecutions: 0
    }
    stats.creditsConsumed = executions.reduce((acc, exec) => {
        return acc + exec.creditsConsumed
    }, 0)
    stats.phaseExecutions = executions.reduce((acc, exec) => {
        return acc + exec.phases.length
    }, 0)

    return stats;
}