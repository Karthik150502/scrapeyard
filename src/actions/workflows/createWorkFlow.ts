"use server"

import prisma from "@/lib/prisma";
import CreateFlowNode from "@/lib/workflow/createflowNode";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflows"
import { AppNode } from "@/types/appNode";
import { TaskType } from "@/types/task";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { Edge } from "@xyflow/react";
import { redirect } from "next/navigation";


export async function createWorkFlow(form: createWorkflowSchemaType) {
    const { success, data } = createWorkflowSchema.safeParse(form);

    if (!success) {
        throw new Error("Invalid form data");
    }

    const { userId } = auth();

    if (!userId) {
        throw new Error("Unauthenticated");
    }


    const initialFlow: { nodes: AppNode[], edges: Edge[] } = {
        nodes: [],
        edges: []
    }


    initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER))

    const result = await prisma.workflow.create({
        data: {
            userId,
            status: WorkflowStatus.DRAFT,
            definition: JSON.stringify(initialFlow),
            ...data
        }
    })

    if (!result) {
        throw new Error("Failed to create workflow.")
    }

    redirect(`/workflow/editor/${result.id}`)
}


