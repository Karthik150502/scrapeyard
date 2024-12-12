'use client'
import { Workflow } from '@prisma/client'
import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { WorkflowExecutionStatus, WorkflowStatus } from '@/types/workflow'
import { ChevronRight, Clock, FileTextIcon, PlayIcon, ShuffleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import WorkFlowActions from './WorkFlowActions'
import RunButton from '@/app/workflow/_components/runButton'
import { SchedulerSection } from '@/app/workflow/_components/schedulerDialog'
import ExecutionStatusIndicator, { ExecutionStatusLabel } from '@/app/workflow/run/[workflowId]/_components/executionStatusIndicator'
import { format, formatDistanceToNow } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import DuplicateWorkFlowDialog from './DuplicateWorkFlowDialog'
import TooltipWrapper from '@/components/ui/app/tooltipWrapper'
type Props = {
    workflow: Workflow
}
const STATUS_COLOR: { [status: string]: string } = {
    [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-700",
    [WorkflowStatus.PUBLISHED]: "bg-primary"
}
export default function WorkflowCard2({ workflow }: Props) {
    const [isDraft] = useState(() => workflow.status === WorkflowStatus.DRAFT);

    return (
        <Card className='cursor-pointer border border-separate shadow-sm overflow-hidden hover:shadow-md dark:shadow-primary/30 h-auto group/card'>
            <CardContent className='p-4 flex flex-col items-center justify-between w-full h-full'>
                <div className='w-full flex flex-col items-center justify-start gap-y-2'>

                    <div className="flex items-center w-full px-4 justify-between">
                        <div className='flex items-center justify-center gap-x-2'>

                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", STATUS_COLOR[workflow.status])}>
                                {
                                    isDraft ? <FileTextIcon strokeWidth={1.5} className='h-5 w-5' /> : <PlayIcon strokeWidth={1.5} className="h-4 w-5 text-white" />
                                }
                            </div>
                            <div className='flex items-start justify-center gap-2'>
                                {
                                    isDraft && (<span className='py-0.5 text-xs font-medium bg-yellow-100 text-black px-2 rounded-full'>
                                        Draft
                                    </span>)
                                }
                            </div>
                            <DuplicateWorkFlowDialog workflowId={workflow.id} name={workflow.name} />

                        </div>
                        <div className="flex items-center space-x-2">
                            {
                                !isDraft && <RunButton workflowId={workflow.id} />
                            }
                            <Link
                                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex items-center gap-2")}
                                href={`/workflow/editor/${workflow.id}`}><ShuffleIcon /> Edit</Link>

                            <WorkFlowActions workflowName={workflow.name} workflowId={workflow.id} />
                        </div>
                    </div>
                    <div className='w-full flex flex-col items-start justify-start border-b dark:border-b-white/25 border-b-black/15'>
                        <div className='w-full text-center py-1 flex items-center justify-center'>
                            <span>
                                <TooltipWrapper side={"top"} content={workflow.description || workflow.name}>
                                    <Link className='text-md font-semibold hover:underline' href={`/workflow/editor/${workflow.id}`}>{workflow.name}</Link>
                                </TooltipWrapper>
                            </span>
                        </div>
                    </div>
                </div>

                <CardFooter className="w-full flex gap-y-1 flex-col items-center justify-center">
                    <div className='w-full py-2 flex items-center justify-center'>
                        <SchedulerSection isDraft={isDraft} creditsCost={workflow.creditsCost} workflowId={workflow.id} cron={workflow.cron} />
                    </div>
                    <div className='w-full py-1 flex items-center justify-center'>
                    </div>
                </CardFooter>
                <LastRunDetails workflow={workflow} />
            </CardContent>
        </Card >
    )
}

function LastRunDetails({
    workflow: {
        lastRunAt,
        lastRunId,
        id,
        lastRunStatus,
        nextRunAt,
        status
    }
}: {
    workflow: Workflow
}) {
    const formattedStartedAt = lastRunAt && formatDistanceToNow(lastRunAt, { addSuffix: true });
    const nextScheduleAt = nextRunAt && format(nextRunAt, "yyyy-MM-dd HH:mm");
    const nextScheduleAtUTC = nextRunAt && formatInTimeZone(nextRunAt, "UTC", "HH:mm");
    const isDraft = status === WorkflowStatus.DRAFT;
    if (isDraft) {
        return null;
    }
    return <div className='bg-primary/15 px-4 py-2 gap-y-2 flex flex-col justify-between items-center text-muted-foreground rounded-sm w-full text-xs'>

        <div className="flex item-center justify-start w-full gap-2">
            {
                lastRunAt && <Link href={`/workflow/run/${id}/${lastRunId}`} className="flex items-center justify-center gap-2 group">
                    <span>
                        Last run:
                    </span>
                    <ExecutionStatusIndicator status={lastRunStatus as WorkflowExecutionStatus} />
                    <ExecutionStatusLabel status={lastRunStatus as WorkflowExecutionStatus} />
                    <span>{formattedStartedAt}</span>
                    <ChevronRight size={15} className='-translate-x-[2px] group-hover:translate-x-0 transition' />
                </Link>
            } {
                !lastRunAt && <p>No runs yet.</p>
            }
        </div>

        <div className="flex item-center gap-2 w-full justify-start">
            {
                nextRunAt && <div className='flex font-bold items-center justify-center gap-2'>
                    <Clock size={15} strokeWidth={1} />
                    <span>Next run at:</span>
                    <span>{nextScheduleAt}</span>
                    <span>({nextScheduleAtUTC} UTC)</span>
                </div>

            }
        </div>
    </div>
}