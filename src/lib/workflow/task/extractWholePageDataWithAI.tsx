import { TaskParamType, TaskType } from '@/types/task'
import { WorkFlowTaskType } from '@/types/workflow'
import { LucideProps, Wand } from 'lucide-react'
import React from 'react'

export const extractWholePageDataTask = {
    type: TaskType.GET_ALL_PAGE_CONTENT,
    credits: 8,
    label: "Extract whole page data with AI",
    isEntryPoint: false,
    icon: (props: LucideProps) => <Wand className='stroke-rose-400' {...props} />,
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
        }
    ] as const,
    outputs: [
        {
            name: "Extracted Data",
            type: TaskParamType.STRING
        }
    ] as const
} satisfies WorkFlowTaskType;


