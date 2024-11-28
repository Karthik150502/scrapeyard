'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { UploadIcon, Loader } from 'lucide-react';
import useExecutionPlan from '@/hooks/use-execution-plan';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { publishWorkflow } from '@/actions/workflows/publishWorkflow';
import { useReactFlow } from '@xyflow/react';

export default function PublishButton({ workflowId }: { workflowId: string }) {

    const generate = useExecutionPlan();
    const { toObject } = useReactFlow();


    const { mutate, isPending } = useMutation({
        mutationFn: publishWorkflow,
        onSuccess: () => {
            toast.success("Published workflow.", { id: workflowId })
        },
        onError: () => {
            toast.error("Something went wrong.", { id: workflowId })
        }
    })

    const handleExecution = () => {
        toast.loading("Publishing workflow...", { id: workflowId })
        let plan = generate();
        if (!plan) {
            toast.dismiss(workflowId);
            return;
        }
        mutate({ id: workflowId, flowDefinition: JSON.stringify(toObject()) });
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
                isPending ? <Loader strokeWidth={1.5} size={16} className='stroke-slate-500 animate-spin' /> : <UploadIcon strokeWidth={1.5} size={16} className='stroke-primary' />
            }

            {isPending ? "Publishing" : "Publish"}
        </Button>
    )
}
