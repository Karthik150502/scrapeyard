'use client'
import React, { useState } from 'react'


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogTitle,
    AlertDialogHeader,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { deleteWorkflow } from '@/actions/workflows/deleteWorkflow'
import { toast } from 'sonner'


type Props = {
    open: boolean,
    setOpen: ((open: boolean) => void),
    workflowName: string,
    workflowId: string
}


export default function DeleteWorkFlow({ open, setOpen, workflowName, workflowId }: Props) {


    const [confirmText, setConfirmText] = useState<string>("");
    const { mutate, isPending } = useMutation({
        mutationFn: deleteWorkflow,
        onSuccess: () => {
            toast.success("Deleted the workflow.", { id: workflowId })
        },
        onError: () => {
            toast.error("Some error occured while deleting the workflow", { id: workflowId })
        }
    })




    return (
        <AlertDialog open={open} onOpenChange={() => {
            setConfirmText("")
            setOpen(!open)
        }}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure you want to delete the workflow?</AlertDialogTitle>
                    <AlertDialogDescription className='text-sm'>
                        This action cannot be undone.
                        <div className="flex flex-col py-4 gap-2">
                            <p className='text-xs'>if you are sure, enter <b>"{workflowName}"</b> to confirm: </p>
                            <Input onChange={(e) => {
                                setConfirmText(e.target.value)
                            }} value={confirmText} />
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={(e) => {
                        e.stopPropagation();
                        toast.loading("Deleting workflow...", { id: workflowId })
                        mutate(workflowId)
                    }} disabled={confirmText !== workflowName || isPending} className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                    >Confirm Delete</AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
