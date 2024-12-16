'use server'

import { periodToDateRange } from "@/lib/helper/dates";
import prisma from "@/lib/prisma";
import { Period } from "@/types/analytics";
import { WorkflowExecutionStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { eachDayOfInterval, format } from "date-fns";


type Stats = Record<string, {
    success: number,
    failed: number
}>;
export async function getWorlflowEcxecutionStats(period: Period) {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthenticated.");
    }
    const dateRange = periodToDateRange(period);
    const dateFormat = "yyyy-MM-dd";
    const executions = await prisma.workFlowExecution.findMany({
        where: {
            userId,
            startedAt: {
                gte: dateRange.startDate,
                lte: dateRange.endDate
            }
        }
    })
    const stats: Stats = eachDayOfInterval({
        start: dateRange.startDate, end: dateRange.endDate
    }).map(date => format(date, dateFormat)).reduce((acc, date) => {
        acc[date] = {
            success: 0,
            failed: 0
        };
        return acc;
    }, {} as any);


    executions.forEach(exec => {
        const date = format(exec.startedAt!, dateFormat);
        if (exec.status === WorkflowExecutionStatus.COMPLETED) {
            stats[date].success += 1
        }
        if (exec.status === WorkflowExecutionStatus.FAILED) {
            stats[date].failed += 1
        }
    })

    const result = Object.entries(stats).map(([date, stat]) => {
        return {
            date, ...stat
        }
    });
    return result;
}