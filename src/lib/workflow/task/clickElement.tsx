import { TaskParamType, TaskType } from '@/types/task'
import { WorkFlowTaskType } from '@/types/workflow'
import { LucideProps, MousePointer } from 'lucide-react'
import React from 'react'

export const clickElementTask = {
    type: TaskType.CLICK_ELEMENT,
    credits: 1,
    isEntryPoint: false,
    label: "Click Element",
    icon: (props: LucideProps) => <MousePointer className='stroke-teal-400' {...props} />,
    inputs: [
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE,
            required: true,
        },
        {
            name: "Selector",
            type: TaskParamType.STRING,
            required: true,
        },
    ] as const,
    outputs: [
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE
        }
    ] as const
} satisfies WorkFlowTaskType;


