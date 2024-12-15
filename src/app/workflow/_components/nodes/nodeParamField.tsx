'use client'
import { TaskParam, TaskParamType } from '@/types/task'
import React, { useCallback } from 'react'
import StringParam from './params/stringParam'
import { useReactFlow } from '@xyflow/react'
import { AppNode } from '@/types/appNode'
import BrowserInstanceParam from './params/browserInstanceParam'
import SelectParam from './params/selectParam'
import CredentialParam from './params/credentialParam'

export default function NodeParamField({ param, nodeId, disabled }: { nodeId: string, param: TaskParam, disabled: boolean }) {

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
            return <StringParam
                param={param}
                value={value}
                updateNodeParamValue={updateNodeParamValue}
                disabled={disabled}
            />
        }
        case TaskParamType.BROWSER_INSTANCE: {
            return <BrowserInstanceParam
                param={param}
                value={""}
                updateNodeParamValue={updateNodeParamValue} />
        }
        case TaskParamType.SELECT: {
            return <SelectParam
                param={param}
                value={value}
                updateNodeParamValue={updateNodeParamValue}
                disabled={true}
            />
        }
        case TaskParamType.CREDENTIAL: {
            return <CredentialParam
                param={param}
                value={value}
                updateNodeParamValue={updateNodeParamValue}
                disabled={true}
            />
        }
        default: {
            return <div className="w-full">
                <p className='text-xs text-muted-foreground'>Not implemented</p>
            </div>
        }
    }

}
