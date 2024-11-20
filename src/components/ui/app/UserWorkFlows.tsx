import { getWorkFlows } from '@/actions/workflows/getUserWorkFlows'
import React from 'react'
import { Alert, AlertDescription, AlertTitle } from '../alert';
import { AlertCircle, InboxIcon } from 'lucide-react';
import CreateWorkFlowDialog from '@/app/(dashboard)/workflows/_components/CreateWorkFlowDialog';
import WorkflowCard from '@/app/(dashboard)/workflows/_components/WorkflowCard';
import WorkflowCard2 from '@/app/(dashboard)/workflows/_components/WorkflowCard2';

export default async function UserWorkFlows() {


    let workflows = await getWorkFlows();

    if (!workflows) {
        return <Alert variant={"destructive"} className='border-[1.5px] flex flex-col items-start justify-center'>
            <AlertCircle className='w-4 h-4' strokeWidth={1.5} />
            <AlertTitle className='text-sm'>Cannot fetch user Workflows</AlertTitle>
            <AlertDescription className='text-xs'>Something went wrong, please try again later.</AlertDescription>
        </Alert>
    }

    if (workflows.length == 0) {
        return (
            <div className='flex flex-col items-center gap-4 h-full justify-center'>
                <div className="rounded-full bg-accent w-20 h-20 flex justify-center items-center">
                    <InboxIcon size={40} className='stroke-primary' strokeWidth={1.5} />
                </div>

                <div className='flex flex-col text-center gap-1'>
                    <p className="font-bold">No workflows created yet</p>
                    <p className='text-sm text-muted-foreground'>
                        Create your first workflow.
                    </p>
                </div>
                <CreateWorkFlowDialog triggerText='Create your first workflow' />
            </div>
        )
    }




    return <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
        {
            workflows.map(w => {
                return <WorkflowCard2 workflow={w} key={w.id} />
            })
        }
    </div>
}
