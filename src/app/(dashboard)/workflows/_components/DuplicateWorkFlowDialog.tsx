'use client'
import CustomDialogHeader from '@/components/ui/app/CustomDialogHeader'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../../../../components/ui/dialog'
import { Copy, Layers2Icon, Loader2 } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import { duplicateWorkflowSchema, duplicateWorkflowSchemaType } from '@/schema/workflows'
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
import { duplicateWorkflow } from '@/actions/workflows/duplicateWorkflow'
import { cn } from '@/lib/utils'
export default function DuplicateWorkFlowDialog({ workflowId, name }: { workflowId: string, name?: string }) {

    const [open, setOpen] = useState<boolean>(false)


    const form = useForm<duplicateWorkflowSchemaType>({
        resolver: zodResolver(duplicateWorkflowSchema),
        defaultValues: {
            workflowId: workflowId,
            name: name ? `${name} - copy` : ""
        }
    });


    const { mutate, isPending } = useMutation({
        mutationFn: duplicateWorkflow,
        onSuccess: () => {
            toast.success("Duplicated created", { id: "duplicate-workflow" });
            setOpen(false);
        },
        onError: () => {
            toast.error("Failed to duplicate workflow", { id: "duplicate-workflow" })
        }
    })


    const onSubmit = useCallback((values: duplicateWorkflowSchemaType) => {
        toast.loading("duplicating workflow....", { id: "duplicate-workflow" });
        mutate(values);
    }, [mutate])

    return (
        <Dialog
            open={open}
            onOpenChange={open => {
                form.reset();
                setOpen(open)
            }}>
            <DialogTrigger asChild>
                <Button variant={"ghost"} size={"icon"} className={cn("ml-2 transition-opacity opacity-0 duration-300 group-hover/card:opacity-100")}>
                    <Copy size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent className='px-0'>
                <CustomDialogHeader icon={Layers2Icon} title="Duplicate Workflow" />

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
                                            Choose a descriptive and unique name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />



                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='flex gap-1 items-center'>
                                            Description
                                            <p className='text-xs text-muted-foreground'>(optional)</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea className='resize-none' {...field} />
                                        </FormControl>
                                        <FormDescription className='text-xs'>
                                            Provide a brief description of what your workflow does. <br /> This is optional but can help you remember the workflow&apos; purpose.
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
