'use client'
import { getWorkflowExecutionWithPhases } from '@/actions/workflows/getWorkflowExecutionWithPhase'
import { getWorkflowPhaseDetails } from '@/actions/workflows/getWorkflowPhaseDetails';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { datesToDurationString } from '@/lib/helper/dates';
import { getPhasesTotalCost } from '@/lib/helper/phases';
import { WorkflowExecutionStatus } from '@/types/workflow';
import { Return } from '@prisma/client/runtime/library';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { CalendarIcon, CircleDashedIcon, ClockIcon, CoinsIcon, Loader2, LucideIcon, WorkflowIcon } from 'lucide-react';
import React, { ReactNode, useState } from 'react'


type ExecutionData = Awaited<Return<typeof getWorkflowExecutionWithPhases>>;

export default function ExecutionViewer({ initialData }: { initialData: ExecutionData }) {


    const [selectedPhase, setSelectedPhase] = useState<string | null>(null)

    const query = useQuery({
        queryKey: ["execution", initialData?.id],
        initialData,
        queryFn: async () => await getWorkflowExecutionWithPhases(initialData!.id),
        refetchInterval: (q) => {
            return q.state.data?.status === WorkflowExecutionStatus.RUNNNING ? 1000 : false
        }
    })

    const duration = datesToDurationString(query.data?.completedAt, query.data?.startedAt);

    const creditsConsumed = getPhasesTotalCost(query.data?.phases ?? []);

    const phaseDetails = useQuery({
        queryKey: ["phaseDetails", selectedPhase],
        enabled: selectedPhase !== null,
        queryFn: async () => await getWorkflowPhaseDetails(selectedPhase!),
    })

    const isRunning = query.data?.status === WorkflowExecutionStatus.RUNNNING;

    return (
        <div className='flex w-full h-full'>
            <aside className='w-[440px] min-w-[440px] max-w-[440px] border-r border-separate flex flex-grow flex-col overflow-hidden border-r-black/15 dark:border-r-white/15'>
                <div className='py-4 px-2'>
                    <ExecutionLabel
                        label={'Status'}
                        value={query.data?.status}
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
                        value={creditsConsumed}
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
                            <p className='text-xs text-muted-foreground'>{phase.status}</p>
                        </Button>
                    })}
                </div>
            </aside>
            <div className='flex w-full h-full'>
                <pre className=''>{JSON.stringify(phaseDetails.data, null, 4)}</pre>
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