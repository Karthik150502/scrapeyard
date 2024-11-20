'use server'

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"


export async function getWorkflowExecutionWithPhases(execId: string) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Unauthenticated.")
    }
    return await prisma.workFlowExecution.findUnique({
        where: {
            id: execId,
            userId
        },
        include: {
            phases: {
                orderBy: {
                    number: "asc"
                }
            }
        }
    })
}