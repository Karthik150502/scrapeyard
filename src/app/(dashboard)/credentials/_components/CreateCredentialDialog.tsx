'use client'
import CustomDialogHeader from '@/components/ui/app/CustomDialogHeader'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../../../../components/ui/dialog'
import { Loader2, ShieldEllipsis } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createCredentialSchema, createCredentialSchemaType } from '@/schema/credential'
import { createCredentials } from '@/actions/credentials/createCredential'
export default function CreateCredentialDialog({ triggerText }: { triggerText?: string }) {
    const [open, setOpen] = useState<boolean>(false)
    const form = useForm<createCredentialSchemaType>({
        resolver: zodResolver(createCredentialSchema),
    });
    const { mutate, isPending } = useMutation({
        mutationFn: createCredentials,
        onSuccess: () => {
            toast.success("Credential created.", { id: "create-credential" });
            setOpen(false);
            form.reset();
        },
        onError: () => {
            toast.error("Failed to create Credential", { id: "create-credential" })
            setOpen(false);
        }
    })

    const onSubmit = useCallback((values: createCredentialSchemaType) => {
        toast.loading("Creating Credential....", { id: "create-credential" });
        mutate(values);
    }, [mutate])

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    {triggerText ?? "Create"}
                </Button>
            </DialogTrigger>
            <DialogContent className='px-0'>
                <CustomDialogHeader icon={ShieldEllipsis} title="Create Credential" />

                <div className='px-6 py-2'>
                    <Form {...form}>
                        <form className='space-y-8 w-full' onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex gap-1 items-center'>
                                            Name
                                            <p className='text-xs text-primary'>(required)</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription className='text-xs'>
                                            Choose a descriptive and unique name. <br />
                                            This name will be used to identify the credenatial.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                            <FormField
                                control={form.control}
                                name="value"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex gap-1 items-center'>
                                            Value
                                            <p className='text-xs text-primary'>(required)</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea className='resize-none' {...field} />
                                        </FormControl>
                                        <FormDescription className='text-xs'>
                                            Enter the value. <br />
                                            This value will be securely encrypted and stored.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type='submit' className='w-full my-4' disabled={isPending}>
                                {isPending && <Loader2 className="animate-spin" />}
                                {!isPending && "Proceed"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
