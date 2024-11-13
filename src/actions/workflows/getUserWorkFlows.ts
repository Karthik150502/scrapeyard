'use server'

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"


export async function getWorkFlows() {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthenticated");
    }
    return await prisma.workflow.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "asc"
        }
    })
}