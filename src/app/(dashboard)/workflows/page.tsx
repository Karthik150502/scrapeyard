import UserWorkFlowsSk from '@/components/skeletons/userWorkFlows'
import UserWorkFlows from '@/components/ui/app/UserWorkFlows'
import React, { Suspense } from 'react'
import CreateWorkFlowDialog from './_components/CreateWorkFlowDialog'

export default function page() {
    return (
        <div className='flex flex-1 flex-col h-full'>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col items-start'>
                    <h1 className='text-3xl font-bold'>
                        Workflows
                    </h1>
                    <p className='text-muted-foreground'>Manage your Workflows</p>
                </div>
                <CreateWorkFlowDialog triggerText='Create workflow' />
            </div>

            <div className='h-full py-6'>
                <Suspense fallback={<UserWorkFlowsSk />}>
                    <UserWorkFlows />
                </Suspense>
            </div>
        </div>
    )
}
