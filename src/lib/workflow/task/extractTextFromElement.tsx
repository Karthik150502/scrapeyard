import { TaskParamType, TaskType } from '@/types/task'
import { WorkFlowTaskType } from '@/types/workflow'
import { CodeIcon, GlobeIcon, LucideProps, TextIcon } from 'lucide-react'
import React from 'react'


export const ExtractTextFromElement = {
    type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
    credits: 2,
    label: "Extract text from element",
    icon: (props: LucideProps) => <TextIcon className='stroke-rose-400' {...props} />,
    inputs: [
        {
            name: "Html",
            type: TaskParamType.STRING,
            required: true,
            variant: "textarea"
        },
        {
            name: "Selector",
            type: TaskParamType.STRING,
            required: true,
        },
    ] as const,
    outputs: [
        {
            name: "Extracted Text",
            type: TaskParamType.STRING
        }
    ] as const
} satisfies WorkFlowTaskType;


