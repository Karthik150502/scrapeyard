'use client'

import TooltipWrapper from '@/components/ui/app/tooltipWrapper'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import SaveButton from './saveButton'
import ExecuteButton from './ExecuteButton'
import NavigationTab from './navigationTab'

type Props = {
    title: string,
    subtitle?: string,
    workflowId: string,
    hideButtons?: boolean
}

export default function Topbar({ title, subtitle, workflowId, hideButtons = false }: Props) {

    const router = useRouter();

    return (
        <header className='flex px-2 border-b border-separate  justify-between w-full h-[60px] stocky top-0 bg-background z-10'>
            <div className='flex gap-1 flex-1 items-center'>
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
            <NavigationTab workflowId={workflowId}/>
            <div className='flex gap-1 flex-1 justify-end items-center'>
                {!hideButtons &&
                    <>
                        <ExecuteButton workflowId={workflowId} />
                        <SaveButton workflowId={workflowId} />
                    </>
                }
            </div>
        </header>
    )
}
