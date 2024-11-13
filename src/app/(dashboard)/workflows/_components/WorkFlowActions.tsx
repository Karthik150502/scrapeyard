import React, { useState } from 'react'


import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuContent
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { MoreVerticalIcon, TrashIcon } from 'lucide-react'
import TooltipWrapper from '@/components/ui/app/tooltipWrapper'
import DeleteWorkFlow from './DeleteWorkFlow'

export default function WorkFlowActions({ workflowName, workflowId }: { workflowName: string, workflowId: string }) {
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

    return (
        <>
            <DeleteWorkFlow open={showDeleteDialog} setOpen={setShowDeleteDialog} workflowName={workflowName} workflowId={workflowId} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"outline"} size={"sm"} className='p-0 w-10 h-10'>
                        <TooltipWrapper content={"More actions"} side={"top"}>
                            <div className='w-full h-full flex items-center justify-center'>
                                <MoreVerticalIcon size={18} />
                            </div>
                        </TooltipWrapper>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='text-destructive flex items-center gap-2 cursor-pointer' onSelect={() => {
                        setShowDeleteDialog(prev => !prev)
                    }}>
                        <TrashIcon size={16} /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
