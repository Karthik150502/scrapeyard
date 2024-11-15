'use client'

import { cn } from '@/lib/utils'
import { TaskParam } from '@/types/task'
import { Handle, Position } from '@xyflow/react'
import React from 'react'
import NodeParamField from './nodeParamField'

export default function NodeInput({ input, nodeId }: { input: TaskParam, nodeId: string }) {
    return (
        <div className='flex justify-start relative p-3 bg-secondary w-full'>

            <NodeParamField param={input} nodeId={nodeId} />

            {
                !input.hideHandle && <Handle id={input.name} type="target" position={Position.Left} className={cn('!bg-muted-foreground !border-2 !border-background !-left-2 !w-3 !h-3')} />
            }
        </div>
    )
}
