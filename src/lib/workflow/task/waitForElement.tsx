import { TaskParamType, TaskType } from '@/types/task'
import { WorkFlowTaskType } from '@/types/workflow'
import { EyeIcon, LucideProps } from 'lucide-react'
import React from 'react'


export const waitForElementTask = {
    type: TaskType.WAIT_FOR_ELEMENT,
    credits: 1,
    label: "Wait for Element",
    isEntryPoint: false,
    icon: (props: LucideProps) => <EyeIcon className='stroke-amber-400' {...props} />,
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
        {
            name: "Visibility",
            type: TaskParamType.SELECT,
            required: true,
            hideHandle: true,
            options: [
                { label: "Visible", value: "visible" },
                { label: "Hidden", value: "hidden" }
            ]
        },
    ] as const,
    outputs: [
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE
        }
    ] as const
} satisfies WorkFlowTaskType;


