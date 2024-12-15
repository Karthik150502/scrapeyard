import { TaskParamType, TaskType } from '@/types/task'
import { WorkFlowTaskType } from '@/types/workflow'
import { FileJson, LucideProps } from 'lucide-react'
import React from 'react'

export const readPropertyFromJsonTask = {
    type: TaskType.READ_PROPERTY_FROM_JSON,
    credits: 1,
    isEntryPoint: false,
    label: "Read Property from JSON Element",
    icon: (props: LucideProps) => <FileJson className='stroke-rose-400' {...props} />,
    inputs: [
        {
            name: "JSON",
            type: TaskParamType.STRING,
            required: true,
        },
        {
            name: "Property Name",
            type: TaskParamType.STRING,
            required: true,
        },
    ] as const,
    outputs: [
        {
            name: "Property Value",
            type: TaskParamType.STRING
        }
    ] as const
} satisfies WorkFlowTaskType;


