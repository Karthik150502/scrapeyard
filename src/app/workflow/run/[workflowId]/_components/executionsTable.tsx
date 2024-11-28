'use client'


import { getWorkflowExecution } from '@/actions/workflows/getWorkflowExecution'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { datesToDurationString } from '@/lib/helper/dates';
import { Badge } from '@/components/ui/badge';
import ExecutionStatusIndicator from './executionStatusIndicator';
import { WorkflowExecutionStatus } from '@/types/workflow';
import { CoinsIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
type InitialDataType = Awaited<ReturnType<typeof getWorkflowExecution>>;


export default function ExecutionsTable({
    workflowId,
    initialData
}: {
    initialData: InitialDataType,
    workflowId: string
}) {

    const router = useRouter();
    const query = useQuery({
        queryKey: ['executions', workflowId],
        initialData,
        queryFn: async () => await getWorkflowExecution(workflowId),
        refetchInterval: 5000,
    })

    return (
        <div className='border rounded-lg shadow-lg overflow-auto'>
            <Table className='h-full'>
                <TableHeader className='bg-muted'>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Comsumes</TableHead>
                        <TableHead className='text-right text-xs text-muted-foreground'>Started At (desc)</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className='gap-2- h-full overflow-auto'>
                    {
                        query.data.map((exec, index) => {
                            const duration = datesToDurationString(exec.completedAt, exec.startedAt)
                            const formattedStartedAt = exec.startedAt && formatDistanceToNow(exec.startedAt, {
                                addSuffix: true
                            })
                            return <TableRow key={index} className='cursor-pointer'
                                onClick={() => {
                                    router.push(`/workflow/run/${exec.workflowId}/${exec.id}`)
                                }}
                            >
                                <TableCell>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold'>{exec.id}</span>
                                        <div className="text-muted-foreground text-xs">
                                            <span>Triggered Via</span>
                                            <Badge variant={"outline"}>
                                                {exec.trigger}
                                            </Badge>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className='flex flex-col'>
                                        <div className='flex items-center gap-2'>
                                            <ExecutionStatusIndicator status={exec.status as WorkflowExecutionStatus} />
                                            <span className='font-semibold capitalize'>{exec.status}</span>
                                        </div>
                                        <div className='text-muted-foreground text-xs mx-5'>{duration}</div>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className='flex flex-col'>
                                        <div className='flex items-center gap-2'>
                                            <CoinsIcon size={16} className='text-primary' />
                                            <span className='font-semibold capitalize'>{exec.creditsConsumed}</span>
                                        </div>
                                        <div className='text-muted-foreground text-xs mx-5'>Credits</div>
                                    </div>
                                </TableCell>

                                <TableCell className='text-right text-muted-foreground'>
                                    {formattedStartedAt}
                                </TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}
