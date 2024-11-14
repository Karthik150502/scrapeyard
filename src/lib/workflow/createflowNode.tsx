import { AppNode } from '@/types/appNodes'
import { TaskType } from '@/types/task'
import React from 'react'



export default function CreateFlowNode(
    nodeType: TaskType,
    position?: { x: number, y: number }
): AppNode {
    return {
        id: crypto.randomUUID(),
        type: "FlowScrapeNode",
        dragHandle: ".drag-handle",
        data: {
            type: nodeType,
            inputs: {}
        },
        position: position ?? { x: 0, y: 0 }
    }
}
