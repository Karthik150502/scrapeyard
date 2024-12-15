import { TaskParamType, TaskType } from '@/types/task'
import { WorkFlowTaskType } from '@/types/workflow'
import { ArrowUpDown, LucideProps } from 'lucide-react'
import React from 'react'

export const scrollToElementTask = {
    type: TaskType.SCROLL_TO_ELEMENT,
    credits: 1,
    isEntryPoint: false,
    label: "Scroll To Element",
    icon: (props: LucideProps) => <ArrowUpDown className='stroke-teal-400' {...props} />,
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


