import prisma from '@/lib/prisma';
import { waitFor } from '@/lib/waitFor';
import { auth } from '@clerk/nextjs/server';
import { stringify } from 'querystring';
import React from 'react'
import WorkFlowEditor from '../../_components/editor';

type Props = {
    params: {
        workflowId: string
    }
}


export default async function EditorPage({ params }: Props) {

    const { workflowId } = params;
    const { userId } = auth();


    if (!userId) {
        return <div>Unauthenticated</div>
    }



    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId
        }
    })

    if (!workflow) {
        return <div>Workflow not found.</div>
    }


    return (
        <WorkFlowEditor workflow={workflow}>

        </WorkFlowEditor>
    )
}
