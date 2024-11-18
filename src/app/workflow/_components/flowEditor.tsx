"use client"

import CreateFlowNode from '@/lib/workflow/createflowNode';
import { TaskType } from '@/types/task';
import { Workflow } from '@prisma/client'
import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, getOutgoers, Node, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react'
import "@xyflow/react/dist/style.css";
import NodeComponent from './nodes/nodeComponent';
import { useCallback, useEffect } from 'react';
import { AppNode } from '@/types/appNode';
import { BriefcaseConveyorBelt } from 'lucide-react';
import deletableEdge from './edges/DeleteableEdge';
import { TaskRegistry } from '@/lib/workflow/task/registry';


const nodeTypes = {
    FlowScrapeNode: NodeComponent
}


const edgeTypes = {
    default: deletableEdge
}

const snapGrid: [number, number] = [25, 25]; // We can remove, this for more fluid flow of the nodes, while dragging in the editor. 
const fitViewOptions = { padding: 2 };


export default function FlowEditor({ workflow }: { workflow: Workflow }) {




    const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
    const [edges, setEdges, onEdgeChange] = useEdgesState<Edge>([])
    const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

    useEffect(() => {
        try {
            const flow = JSON.parse(workflow.definition);
            if (!flow) {
                return
            }
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);
            if (!flow.viewport) return;
            const { x = 0, y = 0, zoom = 1 } = flow.viewpot;
            setViewport({ x, y, zoom })
        } catch (e) { }
    }, [workflow.definition, setEdges, setNodes, setViewport])


    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move"
    }, [])

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        const taskType = e.dataTransfer.getData("application/reactflow");
        if (typeof taskType === undefined || !taskType) return;

        const position = screenToFlowPosition({
            x: e.clientX,
            y: e.clientY
        })

        const newNode = CreateFlowNode(taskType as TaskType, position);
        setNodes(nds => nds.concat(newNode))
    }, [screenToFlowPosition, setNodes])


    const onConnect = useCallback((connection: Connection) => {
        setEdges((eds) => {
            return addEdge({ ...connection, animated: true }, eds)
        })
        if (!connection.targetHandle) return;

        // Remove input value if present on the connection
        const node = nodes.find(nd => nd.id === connection.target);
        if (!node) return;
        const nodeInputs = node.data.inputs;
        updateNodeData(node.id, {
            inputs: {
                ...nodeInputs,
                [connection.targetHandle]: ""
            }
        })
        // Better Approach
        // delete nodeInputs[connection.targetHandle];
        // updateNodeData(node.id, { inputs: { nodeInputs } })
    }, [setEdges, updateNodeData, nodes])


    const isValidConnection = useCallback((object: Edge | Connection) => {

        // Prevent self-connection.
        if (object.source === object.target) {
            return false;
        }

        // Same taskParam connection should be avoided.
        const source = nodes.find((n) => n.id == object.source);
        const target = nodes.find((n) => n.id == object.target);

        if (!source || !target) {
            console.error("Invalid connection, source/ target not found.")
            return false
        }

        const sourceTask = TaskRegistry[source.data.type];
        const targetTask = TaskRegistry[target.data.type];

        const outputFrom = sourceTask.outputs.find((o: any) => o.name === object.sourceHandle);
        const inputTo = targetTask.inputs.find((o: any) => o.name === object.targetHandle);

        if (outputFrom.type !== inputTo.type) {
            return false;
        }

        // To Detect if cycle exists to the connecting node, if present, return false, to prevent connection.
        // hasCycle revursive function.
        const hasCycle = (node: AppNode, visited = new Set()): boolean => {
            if (visited.has(node.id)) {
                return false;
            }
            visited.add(node.id);
            for (const outgoer of getOutgoers(node, nodes, edges)) {
                if (outgoer.id === object.source) { return true };
                if (hasCycle(outgoer, visited)) { return true };
            }
            return false;
        }

        const detectedCycle = hasCycle(target);
        if (detectedCycle) {
            console.log("@detected cycle");
        }
        return !detectedCycle;

    }, [nodes, edges])


    return (
        <main className='h-full w-full'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onEdgesChange={onEdgeChange}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                snapGrid={snapGrid}
                isValidConnection={isValidConnection}
                fitViewOptions={fitViewOptions}
                snapToGrid
                fitView
                onDragOver={onDragOver}
                onDrop={onDrop}
                onConnect={onConnect}
            >
                <Controls position={"top-left"} fitViewOptions={fitViewOptions} />
                <Background className={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </main>
    )
}
