"use client"

import CreateFlowNode from '@/lib/workflow/createflowNode';
import { TaskType } from '@/types/task';
import { Workflow } from '@prisma/client'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react'
import "@xyflow/react/dist/style.css";
import NodeComponent from './nodes/nodeComponent';


const nodeTypes = {
    FlowScrapeNode: NodeComponent
}


const snapGrid: [number, number] = [25, 25]; // We can remove, this for more fluid flow of the nodes, while dragging in the editor. 
const fitViewOptions = { padding: 2 };


export default function FlowEditor({ workflow }: { workflow: Workflow }) {

    const [nodes, setNodes, onNodesChange] = useNodesState([
        CreateFlowNode(TaskType.LAUNCH_BROWSER),
    ])
    const [edges, setEdges, onEdgeChange] = useEdgesState([])

    return (
        <main className='h-full w-full'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onEdgesChange={onEdgeChange}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                snapGrid={snapGrid}
                fitViewOptions={fitViewOptions}
                snapToGrid
                fitView
            >
                <Controls position={"top-left"} fitViewOptions={fitViewOptions} />
                <Background className={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </main>
    )
}
