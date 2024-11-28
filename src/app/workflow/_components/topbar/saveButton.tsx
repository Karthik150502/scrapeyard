'use client'

import { UpdateWorkFlow } from '@/actions/workflows/updateWorkFlow'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useReactFlow } from '@xyflow/react'
import { CheckIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

export default function SaveButton({ workflowId }: { workflowId: string }) {

    const { toObject } = useReactFlow();
    const saveMutation = useMutation({
        mutationFn: UpdateWorkFlow,
        onSuccess: () => {
            toast.success("Saved the workflow.", { id: workflowId })
        },
        onError: () => {
            toast.error("Error saving the workflow.", { id: workflowId })
        }
    })

    return (
        <Button
            disabled={saveMutation.isPending}
            variant={"outline"}
            className='flex items-center gap-2'
            onClick={() => {
                toast.loading("Saving workflow...", { id: workflowId })
                const workFlowDefinition = JSON.stringify(toObject());
                saveMutation.mutate({
                    id: workflowId,
                    definition: workFlowDefinition
                })
            }}>
            <CheckIcon strokeWidth={1.5} size={16} className='stroke-green-400' />
            Save
        </Button>
    )
}
