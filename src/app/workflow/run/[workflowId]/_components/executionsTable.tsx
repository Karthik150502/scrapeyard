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

type InitialDataType = Awaited<ReturnType<typeof getWorkflowExecution>>;


export default function ExecutionsTable({
    workflowId,
    initialData
}: {
    initialData: InitialDataType,
    workflowId: string
}) {

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
                            return <TableRow key={index}>
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
                                    <div>
                                        <div>
                                            {exec.status}
                                        </div>
                                        <div>{duration}</div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}
