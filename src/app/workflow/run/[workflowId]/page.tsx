import React, { Suspense } from 'react'
import Topbar from '../../_components/topbar/topbar'
import { getWorkflowExecution } from '@/actions/workflows/getWorkflowExecution'
import { InboxIcon, Loader2 } from 'lucide-react'
import { waitFor } from '@/lib/waitFor'
import ExecutionsTable from './_components/executionsTable'


type Props = {
    params: {
        workflowId: string
    }
}

export default function ExecutionPage({ params }: Props) {
    return (
        <div className='h-full w-full overflow-auto'>
            <Topbar
                title="All Runs"
                subtitle="List of all your workflow runs"
                hideButtons
                workflowId={params.workflowId}

            />
            <Suspense fallback={<div className="h-full w-full flex items-center justify-center">
                <Loader2 className='animate-spin stroke-primary' />
            </div>}>
                <ExecutionsTableWrapper workflowId={params.workflowId} />
            </Suspense>
        </div>
    )
}


async function ExecutionsTableWrapper({ workflowId }: { workflowId: string }) {
    const executions = await getWorkflowExecution(workflowId);
    if (!executions) {
        return <div className=''>No Data</div>
    }
    if (executions.length == 0) {
        return <div className='container py-6 '>
            <div className='flex items-center flex-col gap-2 justify-center h-full w-full'>
                <div className='rounded-full bg-accent w-20 h-20 flex items-center justify-center'><InboxIcon size={40} className='stroke-primary' /></div>
                <div className='flex flex-col gap-1 text-center'>
                    <p className='font-bold'>
                        No runs have been triggered yet for this workflow.
                    </p>
                    <p className='text-sm text-muted-foreground'>
                        You can trigger from the editors page
                    </p>
                </div>
            </div>
        </div>
    }

    return <div className='container py-6 w-full'>
        <div className='w-full text-center pb-4'>
            <p className='text-lg font-semibold'>All Executions</p>
        </div>
        <ExecutionsTable initialData={executions} workflowId={workflowId} />
    </div>
}

