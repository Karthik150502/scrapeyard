"use client"
import { runWorkFlow } from '@/actions/workflows/runWorkflow'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { PlayIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

export default function RunButton({ workflowId }: {
    workflowId: string
}) {


    const { mutate, isPending } = useMutation({
        mutationFn: runWorkFlow,
        onSuccess: () => {
            toast.success("Workflow started.", { id: workflowId })
        },
        onError: () => {
            toast.error("Something went wrong.", { id: workflowId })
        },
    })

    return (
        <Button
            variant={"outline"}
            size={"sm"}
            className='flex items-center gap-2'
            disabled={isPending}
            onClick={() => {
                toast.loading("Scheduling run", { id: workflowId })
                mutate({ workflowId });
            }}>
            <PlayIcon size={16} />
            Run
        </Button>
    )
}
