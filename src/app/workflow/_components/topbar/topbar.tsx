'use client'

import TooltipWrapper from '@/components/ui/app/tooltipWrapper'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import SaveButton from './saveButton'
import ExecuteButton from './ExecuteButton'

type Props = {
    title: string,
    subtitle?: string,
    workflowId: string
}

export default function Topbar({ title, subtitle, workflowId }: Props) {

    const router = useRouter();

    return (
        <header className='flex px-2 border-b border-separate justify-between w-full h-[60px] stocky top-0 bg-background z-10'>
            <div className='flex gap-1 felx-1 items-center'>
                <TooltipWrapper content='Back'>
                    <Button variant={"ghost"} size={"icon"} onClick={() => {
                        router.back()
                    }}>
                        <ChevronLeft strokeWidth={1.5} size={20} />
                    </Button>
                </TooltipWrapper>
                <div>
                    <p className='font-bold text-ellipsis truncate'>
                        {title}
                    </p>
                    {
                        subtitle && <p className='text-muted-foreground text-xs text-ellipsis'>
                            {subtitle}
                        </p>
                    }
                </div>
            </div>

            <div className='flex gap-1 flex-1 justify-end items-center'>
                <ExecuteButton workflowId={workflowId}/>
                <SaveButton workflowId={workflowId} />
            </div>
        </header>
    )
}