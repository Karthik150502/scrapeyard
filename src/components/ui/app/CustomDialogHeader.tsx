import React from 'react'
import { DialogHeader, DialogTitle } from '../dialog'
import { LucideIconType } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Separator } from '../separator'



type Props = {
    title?: string,
    subTitle?: string,
    icon?: LucideIconType,
    iconClassName?: string,
    titleClassName?: string,
    subTitleClassName?: string
}


export default function CustomDialogHeader(props: Props) {
    return (
        <DialogHeader className='py-6'>
            <DialogTitle asChild>
                <div className='flex flex-col items-center gap-2 mb-2'>
                    {props.icon && <props.icon strokeWidth={1.5} size={30} className={cn('stroke-primary', props.iconClassName)} />}
                    {props.title && <p className={cn('text-lg text-primary', props.titleClassName)}>{props.title}</p>}
                    {props.subTitle && <p className={cn('text-sm text-muted-foreground', props.subTitleClassName)}>{props.subTitle}</p>}
                </div>
            </DialogTitle>
            <Separator />
        </DialogHeader>
    )
}
