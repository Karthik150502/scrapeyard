'use client'
import { Workflow } from '@prisma/client'
import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { WorkflowStatus } from '@/types/workflow'
import { FileTextIcon, PlayIcon, ShuffleIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import WorkFlowActions from './WorkFlowActions'



type Props = {
    workflow: Workflow
}


const STATUS_COLOR: { [status: string]: string } = {
    [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-700",
    [WorkflowStatus.PUBLISHED]: "bg-primary"
}



export default function WorkflowCard({ workflow }: Props) {

    const [isDraft] = useState(() => workflow.status === WorkflowStatus.DRAFT);

    return (
        <Card className='cursor-pointer border border-separate shadow-sm overflow-hidden hover:shadow-md dark:shadow-primary/30'>
            <CardContent className='p-4 flex items-center justify-between h-[100px]'>

                <div className='flex items-center justify-end space-x-3 gap-x-2'>

                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", STATUS_COLOR[workflow.status])}>
                        {
                            isDraft ? <FileTextIcon strokeWidth={1.5} className='h-5 w-5' /> : <PlayIcon strokeWidth={1.5} className="h-4 w-5 text-white" />
                        }
                    </div>

                    <div className='flex flex-col items-start justify-center gap-y-1'>
                        <Link className='flex items-center hover:underline' href={`/workflow/editor/${workflow.id}`}>{workflow.name}{
                            isDraft && (<span className='ml-2 py-0.5 text-xs font-medium bg-yellow-100 text-black px-2 rounded-full'>
                                Draft
                            </span>)
                        }</Link>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Link
                        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex items-center gap-2")}
                        href={`/workflow/editor/${workflow.id}`}><ShuffleIcon /> Edit</Link>

                    <WorkFlowActions workflowName={workflow.name} workflowId={workflow.id} />
                </div>
            </CardContent>
        </Card>
    )
}
