
import Topbar from '@/app/workflow/_components/topbar/topbar'
import { Loader } from 'lucide-react'
import React, { Suspense } from 'react'
import { ExecutionViewerWrapper } from './_components/executionViewerWrapper'

type Props = {
    params: {
        executionId: string,
        workflowId: string
    }
}

export default function ExecutionViewerPage({ params }: Props) {
    return (
        <div className='flex flex-col h-screen w-full overflow-hidden'>
            <Topbar
                workflowId={params.workflowId}
                title={"Workflow Execution Viewer"}
                subtitle={`Execution ID: ${params.executionId}`}
                hideButtons={true} />
            <section className='flex h-full overflow-auto'>
                <Suspense fallback={<div className='flex h-screen w-full items-center justify-center'>
                    <Loader className='animate-spin stroke-primary' size={30} />
                </div>}>
                    <ExecutionViewerWrapper executionId={params.executionId}/>
                </Suspense>
            </section>
        </div>
    )
}



