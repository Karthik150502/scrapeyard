import { TaskParamType, TaskType } from '@/types/task'
import { WorkFlowTaskType } from '@/types/workflow'
import { Link2Icon, LucideProps } from 'lucide-react'
import React from 'react'

export const navigateUrlTask = {
    type: TaskType.NAVIGATE_URL,
    credits: 2,
    isEntryPoint: false,
    label: "Navigate Url",
    icon: (props: LucideProps) => <Link2Icon className='stroke-teal-400' {...props} />,
    inputs: [
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE,
            required: true,
        },
        {
            name: "URL",
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


