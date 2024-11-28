'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { Loader, FileX2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { unPublishWorkflow } from '@/actions/workflows/unPublishWorkflow';

export default function UnPublishButton({ workflowId }: { workflowId: string }) {



    const { mutate, isPending } = useMutation({
        mutationFn: unPublishWorkflow,
        onSuccess: () => {
            toast.success("Unpublished workflow.", { id: workflowId })
        },
        onError: () => {
            toast.error("Something went wrong.", { id: workflowId })
        }
    })

    const handleExecution = () => {
        toast.loading("Unpublishing workflow...", { id: workflowId, duration: 2 })
        mutate(workflowId);
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
                isPending ? <Loader strokeWidth={1.5} size={16} className='stroke-slate-500 animate-spin' /> : <FileX2Icon strokeWidth={1.5} size={16} className='stroke-red-500' />
            }

            {isPending ? "Unpublishing" : "Unpublish"}
        </Button>
    )
}
