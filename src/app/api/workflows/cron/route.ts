import { getAppUrl } from "@/lib/helper/getAppUrl";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflow";
import { NextResponse } from "next/server";
import axios from "axios";
export async function GET(req: Request) {
    const now = new Date();

    const workflows = await prisma.workflow.findMany({
        select: { id: true },
        where: {
            status: WorkflowStatus.PUBLISHED,
            cron: { not: null },
            nextRunAt: {
                lte: now,
            }
        }
    });
    workflows.forEach((wf) => {
        triggerWorkflow(wf.id)
    })
    return NextResponse.json({
        workflowsToRun: workflows.length
    }, {
        status: 200
    })
}


async function triggerWorkflow(id: string) {
    const triggerApiUrl = getAppUrl(`api/workflows/execute?workflowId=${id}`);
    try {
        await axios.get(triggerApiUrl, {
            headers: {
                Authorization: `Bearer ${process.env.API_SECRET!}`
            }
        })
    } catch (error) {
        console.log(error)
        console.error(`Error triggering the workflow ${id}: ${error instanceof Error ? error.message : error}`);
    }
}