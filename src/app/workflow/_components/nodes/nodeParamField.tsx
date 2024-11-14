'use client'
import { TaskParam, TaskParamType } from '@/types/task'
import { Input } from '@/components/ui/input'
import React, { useCallback } from 'react'
import StringParam from './params/stringParam'
import { useReactFlow } from '@xyflow/react'
import { AppNode } from '@/types/appNodes'

export default function NodeParamField({ param, nodeId }: { nodeId: string, param: TaskParam }) {

    const { updateNodeData, getNode } = useReactFlow();

    const node = getNode(nodeId) as AppNode;
    const value = node?.data?.inputs?.[param.name];

    const updateNodeParamValue = useCallback((newval: string) => {
        updateNodeData(nodeId, {
            inputs: {
                ...node?.data.inputs,
                [param.name]: newval
            }
        })
    }, [nodeId, param.name, updateNodeData, node?.data.inputs])

    switch (param.type) {
        case TaskParamType.STRING: {
            return <StringParam param={param} value={value} updateNodeParamValue={updateNodeParamValue} />
        }
        default: {
            return <div className="w-full">
                <p className='text=xs text-muted-foreground'>Not implemented</p>
            </div>
        }
    }

}
