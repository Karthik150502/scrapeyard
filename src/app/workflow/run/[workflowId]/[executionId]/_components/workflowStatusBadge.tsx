import { WorkflowExecutionStatus } from '@/types/workflow'
import { CircleCheck, CircleDashed, CircleX, Loader2 } from 'lucide-react';
import React from 'react'

export default function WorkflowStatusBadge({ status }: { status: WorkflowExecutionStatus }) {
    switch (status) {
        case WorkflowExecutionStatus.PENDING: {
            return <CircleDashed size={20} className='stroke-muted-foreground' />
        }
        case WorkflowExecutionStatus.RUNNING: {
            return <Loader2 size={20} className='stroke-yellow-500 animate-spin' />
        }
        case WorkflowExecutionStatus.COMPLETED: {
            return <CircleCheck size={20} className='stroke-primary' />
        }
        case WorkflowExecutionStatus.FAILED: {
            return <CircleX size={20} className='stroke-destructive' />
        }
        default: {
            return <div className='rounded-full px-4 py-1'>{status}</div>
        }
    }

}
