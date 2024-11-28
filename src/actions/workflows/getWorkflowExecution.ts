'use server'

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getWorkflowExecution(workflowId: string) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Unauthenticated");
    }

    return await prisma.workFlowExecution.findMany({
        where: {
            workflowId, userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}