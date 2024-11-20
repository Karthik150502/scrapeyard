'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import useExecutionPlan from '@/hooks/use-execution-plan';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { runWorkFlow } from '@/actions/workflows/runWorkflow';
import { useReactFlow } from '@xyflow/react';

export default function ExecuteButton({ workflowId }: { workflowId: string }) {

    const generate = useExecutionPlan();
    const { toObject } = useReactFlow();


    const { mutate, isPending } = useMutation({
        mutationFn: runWorkFlow,
        onSuccess: () => {
            toast.success("Execution started.", { id: "flow-executing" })
        },
        onError: () => {
            toast.error("Something went wrong.", { id: "flow-execition." })
        }
    })

    const handleExecution = () => {
        let plan = generate();
        if (!plan) { return; }
        mutate({ workflowId, flowDefinition: JSON.stringify(toObject()) });
    }

    return (
        <Button
            variant={"outline"}
            className='flex items-center gap-2'
            disabled={isPending}
            onClick={() => {
                handleExecution();
            }}>
            {
                isPending ? <Pause strokeWidth={1.5} size={16} className='stroke-red-500' /> : <Play strokeWidth={1.5} size={16} className='stroke-blue-700' />
            }

            {isPending ? "Executing" : "Execute"}
        </Button>
    )
}
