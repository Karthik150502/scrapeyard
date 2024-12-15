import { TaskParamType, TaskType } from '@/types/task'
import { WorkFlowTaskType } from '@/types/workflow'
import { BrainIcon, LucideProps, MousePointer } from 'lucide-react'
import React from 'react'

export const extractDataWithAiTask = {
    type: TaskType.EXTRACT_DATA_WITH_AI,
    credits: 4,
    label: "Extract data with AI",
    isEntryPoint: false,
    icon: (props: LucideProps) => <BrainIcon className='stroke-rose-400' {...props} />,
    inputs: [
        {
            name: "Content",
            type: TaskParamType.STRING,
            required: true,
        },
        {
            name: "Credentials",
            type: TaskParamType.CREDENTIAL,
            required: true,
        },
        {
            name: "Prompt",
            type: TaskParamType.STRING,
            required: true,
            variant: "textarea"
        },
    ] as const,
    outputs: [
        {
            name: "Extracted Data",
            type: TaskParamType.STRING
        }
    ] as const
} satisfies WorkFlowTaskType;


