"use client"

import TooltipWrapper from '@/components/ui/app/tooltipWrapper'
import { Badge } from '@/components/ui/badge'
import { Calendar1Icon, Clock, CoinsIcon, CornerDownRightIcon, MoveRight, TriangleAlert } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import CustomDialogHeader from '@/components/ui/app/CustomDialogHeader'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { updateWorkflowCron } from '@/actions/workflows/updateWorkflowCron'
import { toast } from 'sonner';
import cronstrue from "cronstrue";
import parser from "cron-parser";
import { removeWorkflowSchedule } from '@/actions/workflows/removeWorkflowSchedule'
import { Separator } from '@/components/ui/separator'


export default function SchedulerDialog(props: { workflowId: string, cron: string | null }) {

    const [cron, setCron] = useState<string>(props.cron || "");
    const [validCron, setValidCron] = useState<boolean>(false);
    const [readableCron, setReadableCron] = useState<string>("");

    const { mutate, isPending } = useMutation({
        mutationFn: updateWorkflowCron,
        onSuccess: () => {
            toast.success("Schedule updated successfully", { id: "cron" })
        },
        onError: (e: any) => {
            toast.error(e.message, { id: "cron" })
        }
    });

    const removeSchdMutation = useMutation({
        mutationFn: removeWorkflowSchedule,
        onSuccess: () => {
            toast.success("Schedule updated successfully", { id: "cron" })
        },
        onError: (e: any) => {
            toast.error(e.message, { id: "cron" })
        }
    });

    useEffect(() => {
        try {
            parser.parseExpression(cron);
            let readableCronExp = cronstrue.toString(cron);
            setReadableCron(readableCronExp)
            setValidCron(true);
        } catch {
            setValidCron(false);
        }
    }, [cron])


    const workflowHasValidCron = props.cron && props.cron.length > 0;
    const readableSavedCron = workflowHasValidCron && cronstrue.toString(props.cron!)

    return <Dialog>
        <DialogTrigger asChild>
            <Button variant={"link"} size={"sm"} className={cn("text-xs p-0 h-auto text-orange-400", {
                "text-primary": workflowHasValidCron
            })}>
                {workflowHasValidCron ? <div className='flex items-center gap-1'>
                    <Clock className='h-3 w-3' />
                    <span className='text-xs font-semibold'>{readableSavedCron}</span>
                </div> : <div className='flex items-center gap-1'>
                    <TriangleAlert className='h-3 w-3' /> <span className='text-xs font-semibold'>Set Shcedule</span>
                </div>
                }
            </Button>
        </DialogTrigger>
        <DialogContent className='px-0'>
            <CustomDialogHeader title='Schedule workflow execution' icon={Calendar1Icon} />
            <div className='p-6 space-y-4'>
                <p className='text-muted-foreground text-xs'>Specify a cron expression to schedule periodic workflow execution. Time is assumed to be UTC.</p>
                <Input placeholder='E.g., * * * * *' value={cron} onChange={(e) => {
                    setCron(e.target.value)
                }} />
                <div className={cn("bg-accent rounded-md py-3 px-4 border text-xs border-destructive text-destructive", {
                    "border-primary text-primary": validCron
                })}>
                    {validCron ? readableCron : "Invalid cron expression"}
                </div>

                {
                    validCron && <DialogClose asChild className='w-full'>
                        <div className='w-full'>
                            <Button className='w-full text-destructive border-destructive hover:text-destructive'
                                variant={"outline"}
                                disabled={isPending || removeSchdMutation.isPending}
                                onClick={() => {
                                    toast.loading("Removing the cron schedule", { id: "cron" })
                                    removeSchdMutation.mutate(props.workflowId)
                                }}
                            >
                                Remove current schedule
                            </Button>
                            <Separator className="my-4" />
                        </div>
                    </DialogClose>
                }
            </div>
            <DialogFooter className='px-6 gap-2'>
                <DialogClose asChild>
                    <Button className='w-full' variant={"secondary"}>
                        Cancel
                    </Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button
                        className='w-full'
                        variant={"default"}
                        disabled={isPending || !validCron}
                        onClick={() => {
                            toast.loading("Saving the Cron schedule", { id: "cron" })
                            mutate({ id: props.workflowId, cron })
                        }}
                    >
                        Save
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}



export function SchedulerSection({ isDraft, creditsCost, workflowId, cron }: { isDraft: boolean, creditsCost: number, workflowId: string, cron: string | null }) {


    if (isDraft) {
        return null
    }

    return (
        <div className='flex items-center gap-2'>
            <CornerDownRightIcon className='h-4 w-4 text-muted-foreground' />
            <SchedulerDialog workflowId={workflowId} cron={cron} key={`${cron}-${workflowId}`} />
            <MoveRight className='h-4 w-4 text-muted-foreground' />
            <TooltipWrapper content="Credits required for full run.">
                <div className='flex items-center gap-2'>
                    <Badge variant={"outline"} className='space-x-2 text-muted-foreground rounded-sm py-1' >
                        <CoinsIcon className='h-4 w-4' />
                        <span className='text-xs font-semibold'>{creditsCost}</span>
                    </Badge>
                </div>
            </TooltipWrapper>
        </div>
    )
}