import { TaskParamType, TaskType } from '@/types/task'
import { WorkFlowTaskType } from '@/types/workflow';
import { LucideProps, GlobeIcon } from 'lucide-react'
import React from 'react'


export const LaunchBrowserTask = {
    type: TaskType.LAUNCH_BROWSER,
    label: "Launch Browser",
    credits: 5,
    icon: (props: LucideProps) => <GlobeIcon className='stroke-purple-600' {...props} />,
    isEntryPoint: true,
    inputs: [
        {
            name: "Website URL",
            type: TaskParamType.STRING,
            helperText: "eg: https://www.google.com",
            required: true,
            hideHandle: true
        }
    ] as const,
    outputs: [
        {
            name: "Web Page",
            type: TaskParamType.BROWSER_INSTANCE
        }
    ] as const
} satisfies WorkFlowTaskType;


