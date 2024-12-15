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
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteCredential } from '@/actions/credentials/deleteCredential'


type Props = {
    name: string
}


export default function DeleteCredentialDialog({ name }: Props) {


    const [confirmText, setConfirmText] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const { mutate, isPending } = useMutation({
        mutationFn: deleteCredential,
        onSuccess: () => {
            setConfirmText("");
            toast.success("Deleted the credential.", { id: name })
        },
        onError: () => {
            toast.error("Some error occured while deleting the credential", { id: name })
        }
    })
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" size={"icon"}>
                    <XIcon className='stroke-red-500' size={18} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure you want to delete the credential?</AlertDialogTitle>
                    <AlertDialogDescription className='text-sm'>
                        This action cannot be undone.
                        <div className="flex flex-col py-4 gap-2">
                            <p className='text-xs'>if you are sure, enter <b>&quot;{name}&quot;</b> to confirm: </p>
                            <Input onChange={(e) => {
                                setConfirmText(e.target.value)
                            }} value={confirmText} />
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={(e) => {
                        toast.loading("Deleting credential...", { id: name })
                        mutate(name)
                    }} disabled={confirmText !== name || isPending} className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                    >Confirm Delete</AlertDialogAction>
                    <AlertDialogCancel onClick={() => { setConfirmText("") }}>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
