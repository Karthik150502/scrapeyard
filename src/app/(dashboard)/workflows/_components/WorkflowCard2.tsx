'use client'
import { Workflow } from '@prisma/client'
import React, { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { WorkflowStatus } from '@/types/workflow'
import { FileTextIcon, PlayIcon, ShuffleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import WorkFlowActions from './WorkFlowActions'
import RunButton from '@/app/workflow/_components/runButton'
import { Separator } from '@radix-ui/react-select'
import SchedulerDialog, { SchedulerSection } from '@/app/workflow/_components/schedulerDialog'



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
        <Card className='cursor-pointer border border-separate shadow-sm overflow-hidden hover:shadow-md dark:shadow-primary/30 h-[200px]'>
            <CardContent className='p-4 flex flex-col items-center justify-start w-full h-full'>
                <div className="flex items-center w-full px-4 justify-between">
                    <div className='flex items-center justify-center gap-x-2'>

                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", STATUS_COLOR[workflow.status])}>
                            {
                                isDraft ? <FileTextIcon strokeWidth={1.5} className='h-5 w-5' /> : <PlayIcon strokeWidth={1.5} className="h-4 w-5 text-white" />
                            }
                        </div>

                        <div className='flex flex-col items-start justify-center gap-y-1'>
                            {
                                isDraft && (<span className='py-0.5 text-xs font-medium bg-yellow-100 text-black px-2 rounded-full'>
                                    Draft
                                </span>)
                            }
                        </div>

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
                            <Link className='text-md font-semibold hover:underline' href={`/workflow/editor/${workflow.id}`}>{workflow.name}</Link>
                        </span>
                    </div>
                    {
                        workflow.description ? <div className='w-full border-t dark:border-t-white/15 border-t-black/15 py-3'>
                            <p className='text-xs text-muted-foreground line-clamp-3'>{workflow.description}</p>
                        </div> : <></>
                    }

                </div>

                <CardFooter>
                    <div className='w-full py-2 flex items-center justify-center'>
                        <SchedulerSection isDraft={isDraft} creditsCost={workflow.creditsCost} workflowId={workflow.id} cron={workflow.cron} />
                    </div>
                </CardFooter>
            </CardContent>
        </Card>
    )
}