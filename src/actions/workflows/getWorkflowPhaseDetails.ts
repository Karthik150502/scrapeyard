"use server"

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";


export async function getWorkflowPhaseDetails(phaseId: string) {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthenticated")
    }

    return prisma.executionPhase.findUnique({
        where: {
            id: phaseId,
            execution: {
                userId
            }
        },
        include: {
            executionLogs: {
                orderBy: {
                    timeStamp: "asc"
                }
            }
        }
    })
} 