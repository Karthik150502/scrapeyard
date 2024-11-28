import { TaskParamType, TaskType } from '@/types/task'
import { WorkFlowTaskType } from '@/types/workflow';
import { CodeIcon, GlobeIcon, LucideProps } from 'lucide-react'
import React from 'react'


export const PageToHTMLTask = {
    type: TaskType.PAGE_TO_HTML,
    credits: 2,
    label: "Get HTML from page",
    icon: (props: LucideProps) => <CodeIcon className='stroke-rose-400' {...props} />,
    inputs: [
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE,
            required: true,
        }
    ] as const,
    outputs: [
        {
            name: "Html",
            type: TaskParamType.STRING
        },
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE
        }
    ] as const
} satisfies WorkFlowTaskType;


