'use server'
import prisma from "@/lib/prisma";
import { Period } from "@/types/analytics";
import { auth } from "@clerk/nextjs/server";

export async function getPeriods() {
    const { userId } = auth();
    if (!userId) {
        throw new Error("Unauthenticated.")
    }
    const year = await prisma.workFlowExecution.aggregate({
        where: {
            userId,
        },
        _min: {
            startedAt: true
        }
    })

    const currentYear = new Date().getFullYear()
    const minYear = year._min.startedAt ? year._min.startedAt.getFullYear() : currentYear;
    const periods: Period[] = []
    for (let year = minYear; year <= currentYear; year++) {
        for (let month = 0; month <= 11; month++) {
            periods.push({ year, month })
        }
    }

    return periods;
}