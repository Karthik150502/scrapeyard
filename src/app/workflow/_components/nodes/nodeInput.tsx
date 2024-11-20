'use client'

import { cn } from '@/lib/utils'
import { TaskParam } from '@/types/task'
import { Handle, Position, useEdges } from '@xyflow/react'
import React from 'react'
import NodeParamField from './nodeParamField'
import { ColorForHandle } from './common'
import useFlowValidation from '@/hooks/use-flow-validation'

export default function NodeInput({ input, nodeId }: { input: TaskParam, nodeId: string }) {

    const { invalidInputs } = useFlowValidation();
    const edges = useEdges();
    const isConnected = edges.some((e) => e.target === nodeId && e.targetHandle === input.name)

    const hasErrors = invalidInputs.find(node => node.nodeId == nodeId)?.inputs.find(i => i == input.name)

    return (
        <div className={cn('flex justify-start relative p-3 bg-secondary w-full', 
            hasErrors && 'bg-destructive/30'
        )}>

            <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />

            {
                !input.hideHandle && <Handle
                    id={input.name}
                    type="target"
                    position={Position.Left}
                    isConnectable={!isConnected}
                    className={cn('!bg-muted-foreground !border-2 !border-background !-left-2 !w-3 !h-3',
                        ColorForHandle[input.type]
                    )} />
            }
        </div>
    )
}
