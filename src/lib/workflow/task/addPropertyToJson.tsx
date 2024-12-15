import { TaskParamType, TaskType } from '@/types/task'
import { WorkFlowTaskType } from '@/types/workflow'
import { Database, LucideProps } from 'lucide-react'
import React from 'react'

export const addPropertyToJsonTask = {
    type: TaskType.ADD_PROPERTY_TO_JSON,
    credits: 1,
    isEntryPoint: false,
    label: "Add Property from JSON Element",
    icon: (props: LucideProps) => <Database className='stroke-rose-400' {...props} />,
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
        {
            name: "Property Value",
            type: TaskParamType.STRING,
            required: true,
        },
    ] as const,
    outputs: [
        {
            name: "Updated JSON",
            type: TaskParamType.STRING
        }
    ] as const
} satisfies WorkFlowTaskType;


