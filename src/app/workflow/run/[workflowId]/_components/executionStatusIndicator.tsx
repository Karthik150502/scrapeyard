import { cn } from '@/lib/utils'
import { WorkflowExecutionStatus } from '@/types/workflow'
import React from 'react'


const IndicatorStatusColors: Record<WorkflowExecutionStatus, string> = {
    PENDING: "bg-slate-400",
    RUNNING: "bg-yellow-400",
    FAILED: "bg-red-500",
    COMPLETED: "bg-emerald-600"
}

export default function ExecutionStatusIndicator({ status }: { status: WorkflowExecutionStatus }) {
    return (
        <div className={cn("w-2 h-2 rounded-full", IndicatorStatusColors[status])} />
    )
}


const IndicatorStatusLabelColors: Record<WorkflowExecutionStatus, string> = {
    PENDING: "text-slate-400",
    RUNNING: "text-yellow-400",
    FAILED: "text-red-500",
    COMPLETED: "text-emerald-600"
}
export function ExecutionStatusLabel({ status }: { status: WorkflowExecutionStatus }) {
    return (
        <span className={cn("lowercase font-bold", IndicatorStatusLabelColors[status])} >
            {status}
        </span>
    )
}
