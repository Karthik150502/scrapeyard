import { TaskParamType, TaskType } from '@/types/task'
import { WorkFlowTaskType } from '@/types/workflow'
import { LucideProps, SendIcon } from 'lucide-react'
import React from 'react'


export const DeliverViaWebhookTask = {
    type: TaskType.DELIVER_VIA_WEBHOOK,
    credits: 1,
    isEntryPoint: false,
    label: "Deliver via Webhook Element",
    icon: (props: LucideProps) => <SendIcon {...props} className='stroke-green-400-x' />,
    inputs: [
        {
            name: "Target URL",
            type: TaskParamType.STRING,
            required: true,
        },
        {
            name: "Body",
            type: TaskParamType.STRING,
            required: true,
        },
    ] as const,
    outputs: [] as const
} satisfies WorkFlowTaskType;


