'use client'
import { getWorkflowExecutionWithPhases } from '@/actions/workflows/getWorkflowExecutionWithPhase'
import { getWorkflowPhaseDetails } from '@/actions/workflows/getWorkflowPhaseDetails';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { datesToDurationString } from '@/lib/helper/dates';
import { getPhasesTotalCost } from '@/lib/helper/phases';
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from '@/types/workflow';
import { Return } from '@prisma/client/runtime/library';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { CalendarIcon, CircleDashedIcon, ClockIcon, CoinsIcon, Divide, Loader2, LucideIcon, WorkflowIcon } from 'lucide-react';
import React, { ReactNode, useEffect, useState } from 'react'


import {
    Card,
    CardTitle,
    CardDescription,
    CardContent,
    CardHeader
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    TableHead
} from "@/components/ui/table"
import { Input } from '@/components/ui/input';
import { ExecutionLog } from '@prisma/client';
import { cn } from '@/lib/utils';
import { LogLevel } from '@/types/log';
import PhaseStatusBadge from './phaseStatusBadge';
import CountUpWrapper from '@/components/ui/app/countUpWrapper';
import WorkflowStatusBadge from './workflowStatusBadge';

type ExecutionData = Awaited<Return<typeof getWorkflowExecutionWithPhases>>;

export default function ExecutionViewer({ initialData }: { initialData: ExecutionData }) {


    const [selectedPhase, setSelectedPhase] = useState<string | null>(null)

    const query = useQuery({
        queryKey: ["execution", initialData?.id],
        initialData,
        queryFn: async () => await getWorkflowExecutionWithPhases(initialData!.id),
        refetchInterval: (q) => {
            return q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false
        }
    })

    const duration = datesToDurationString(query.data?.completedAt, query.data?.startedAt);

    const creditsConsumed = getPhasesTotalCost(query.data?.phases ?? []);

    const phaseDetails = useQuery({
        queryKey: ["phaseDetails", selectedPhase, query.data?.status],
        enabled: selectedPhase !== null,
        queryFn: async () => await getWorkflowPhaseDetails(selectedPhase!),
    })

    const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNING;

    useEffect(() => {
        const phases = query.data?.phases || [];
        if (isRunning) {
            const phaseToSelect = phases.toSorted((a, b) => a.startedAt! > b.startedAt! ? -1 : 1)[0]
            setSelectedPhase(phaseToSelect.id)
            return;
        } else {
            const phaseToSelect = phases.toSorted((a, b) => a.completedAt! > b.completedAt! ? -1 : 1)[0]
            setSelectedPhase(phaseToSelect.id)
            return;
        }
        // While running we have 
    }, [query.data?.phases, isRunning, setSelectedPhase])

    return (
        <div className='flex w-full h-full'>
            <aside className='w-[440px] min-w-[440px] max-w-[440px] border-r border-separate flex flex-grow flex-col overflow-hidden border-r-black/15 dark:border-r-white/15'>
                <div className='py-4 px-2'>
                    <ExecutionLabel
                        label={'Status'}
                        value={<div className='flex items-center gap-2 capitalize'>
                            <WorkflowStatusBadge status={query.data?.status as WorkflowExecutionStatus} />
                            <span>{query.data?.status}</span>
                        </div>}
                        icon={CircleDashedIcon}
                    />
                    <ExecutionLabel
                        label={'Started at'}
                        value={query.data?.startedAt ? formatDistanceToNow(new Date(query.data?.startedAt), { addSuffix: true }) : "-"}
                        icon={CalendarIcon}
                    />
                    <ExecutionLabel
                        label={'Duration'}
                        value={duration ? duration : <Loader2 className='animate-spin' />}
                        icon={ClockIcon}
                    />
                    <ExecutionLabel
                        label={'Credits consumed'}
                        value={<CountUpWrapper value={creditsConsumed} />}
                        icon={CoinsIcon}
                    />
                </div>
                <Separator />
                <div className='flex justify-center items-center py-2 px-2'>
                    <div className="text-muted-foreground flex items-center gap-2">
                        <WorkflowIcon size={20} className="storke-muted-foreground" />
                        <span className='font-semibold' >
                            Phases
                        </span>
                    </div>
                </div>
                <Separator />
                <div className="overflow-auto h-full px-2 py-2 flex flex-col items-center justify-start gap-y-2">
                    {query.data?.phases.map((phase, i) => {
                        return <Button
                            key={phase.id}
                            className="w-full justify-between"
                            variant={selectedPhase === phase.id ? "secondary" : "outline"}
                            onClick={() => {
                                if (isRunning) { return; }
                                setSelectedPhase(phase.id)
                            }}
                        >
                            <div className='flex items-center gap-2'>
                                <Badge variant={"outline"}>
                                    {i + 1}
                                </Badge>
                                <p>{phase.name}</p>
                            </div>
                            <PhaseStatusBadge status={phase.status as ExecutionPhaseStatus} />
                        </Button>
                    })}
                </div>
            </aside>
            <div className='flex w-full h-full'>
                {/* <pre className=''>{JSON.stringify(phaseDetails.data, null, 4)}</pre> */}
                {isRunning && <div className='flex items-center flex-col gap-2 justify-center h-full w-full'>
                    <p className='font-bold'>Run is in progess please wait.</p>
                </div>}

                {!isRunning && !selectedPhase && (
                    <div className='flex items-center flex-col gap-2 justify-center h-full w-full'>
                        <div className="flex flex-col gap-1 text-center">
                            <p className='font-bold'>No phase selected</p>
                            <p className='text-xs text-muted-foreground'>Select the execution phase to inspect.</p>
                        </div>
                    </div>
                )}

                {
                    !isRunning && selectedPhase && phaseDetails.data && (
                        <div className='flex flex-col py-4 container gap-4 overflow-auto'>
                            <div className='flex gap-2- items-center'>
                                <Badge variant={"outline"} className='gap-x-2'>
                                    <CoinsIcon size={18} className='stroke-muted-foreground' />
                                    <span>Creadits</span>
                                    <span>{phaseDetails.data.creditsConsumed}</span>
                                </Badge>

                                <Badge variant={"outline"} className='gap-x-2'>
                                    <ClockIcon size={18} className='stroke-muted-foreground' />
                                    <span>Duration</span>
                                    <span>{datesToDurationString(phaseDetails.data.completedAt, phaseDetails.data.startedAt) || "-"}</span>
                                </Badge>
                            </div>
                            <ParameterViewer title={"Inputs"} subTitle={"Inputs used for this phase"} paramsJson={phaseDetails.data.inputs} />
                            <ParameterViewer title={"Outputs"} subTitle={"Outputs for this phase"} paramsJson={phaseDetails.data.outputs} />
                            <LogViewer logs={phaseDetails.data.executionLogs} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}



function ExecutionLabel({
    label,
    icon: Icon,
    value
}: {
    icon: LucideIcon,
    label: ReactNode,
    value: ReactNode
}) {
    return <div className='flex justify-between items-center py-2 px-2 text-xs'>
        <div className="text-muted-foreground flex items-center gap-2 ">
            <Icon className='stroke-muted-foreground' size={20} />
            <span>{label}</span>
        </div>
        <div className='font-semibold lowercase flex gap-2 items-center'>
            <span>{value}</span>
        </div>
    </div>
}

function ParameterViewer({ title, subTitle, paramsJson }: {
    title: string,
    subTitle: string,
    paramsJson: string | null
}) {

    const params = paramsJson ? JSON.parse(paramsJson) : undefined;
    return <Card>
        <CardHeader className='rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background'>
            <CardTitle className='text-base'>
                {title}
            </CardTitle>
            <CardDescription className='text-muted-foreground text-sm'>
                {subTitle}
            </CardDescription>
        </CardHeader>
        <CardContent className='py-4'>
            <div className='flex flex-col gap-2'>
                {(!paramsJson || Object.keys(params).length === 0) ? (
                    <p className='text-sm'>No Pramaters generated by this phase.</p>
                ) : (Object.entries(params).map(([key, value], i) => {
                    return <div key={i} className='flex items-center justify-center'>
                        <p className='text-sm text-muted-foreground flex-1 basis-1/3'>
                            {key}
                        </p>
                        <Input readOnly className='flex-1 basis-2/3' value={value as string} />
                    </div>
                })
                )}
            </div>
        </CardContent>
    </Card>
}


function LogViewer({ logs }: { logs: ExecutionLog[] | undefined }) {
    if (!logs || logs.length === 0) {
        return <p className='text-muted-foreground'>No Logs available for the Phase</p>
    }
    return (
        <Card className='w-full'>
            <CardHeader className='rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background'>
                <CardTitle className='text-base'>
                    Logs
                </CardTitle>
                <CardDescription className='text-muted-foreground text-sm'>
                    Logs generated by this phase.
                </CardDescription>
            </CardHeader>

            <CardContent className='p-0'>
                <Table>
                    <TableHeader className='text-muted-foreground text-xs'>
                        <TableRow>
                            <TableHead>Time</TableHead>
                            <TableHead>Level</TableHead>
                            <TableHead>Message</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            logs.map((log, i) => {
                                return <TableRow key={i} className='text-muted-foreground'>
                                    <TableCell width={190} className='text-xs text-muted-foreground p-[2px] pl-4'>{log.timeStamp.toISOString()}</TableCell>
                                    <TableCell width={80} className={cn('uppercase text-xs font-bold p-[3px] pl-4', {
                                        "text-destructive": (log.logLevel as LogLevel) === "error",
                                        "text-yellow-600": (log.logLevel as LogLevel) === "warn",
                                        "text-primary": (log.logLevel as LogLevel) === "info",
                                    })}>{log.logLevel}</TableCell>
                                    <TableCell className='text-sm flex-1 p-[3px] pl-4'>{log.message}</TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}