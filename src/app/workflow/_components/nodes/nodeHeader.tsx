'use client'


import { Badge } from '@/components/ui/badge';
import { TaskRegistry } from '@/lib/workflow/task/registry'
import { TaskType } from '@/types/task'
import { CoinsIcon, Copy, GripVerticalIcon, Trash } from 'lucide-react';
import React from 'react'
import { Button } from '@/components/ui/button';
import { useReactFlow } from '@xyflow/react';
import { toast } from 'sonner';
import { AppNode } from '@/types/appNode';
import CreateFlowNode from '@/lib/workflow/createflowNode';
import TooltipWrapper from '@/components/ui/app/tooltipWrapper';

export default function NodeHeader({ taskType, nodeId }: { taskType: TaskType, nodeId: string }) {

    const task = TaskRegistry[taskType];
    const { deleteElements, getNode, addNodes } = useReactFlow();

    return (
        <div className="flex items-center gap-2 p-2">
            <task.icon size={16} />
            <div className="flex justify-between items-center w-full">
                <p className='text-xs font-bold uppercase text-muted-foreground'>
                    {task.label}
                </p>
                <div className="flex gap-1 items-center text-xs">
                    {task.isEntryPoint && <Badge className='text-center text-[10px] flex items-center justify-center'>Entry point</Badge>}
                    <Badge className='text-center text-[10px] flex items-center justify-center gap-x-1'>
                        {task.credits}
                        <CoinsIcon size={16} />
                    </Badge>
                    {
                        !task.isEntryPoint && <>
                            <Button variant={"ghost"} size={"icon"} onClick={() => {
                                deleteElements({
                                    nodes: [{
                                        id: nodeId
                                    }]
                                });
                                // toast.success("Task deleted.")
                            }}>
                                <Trash size={15} className='stroke-red-500' />
                            </Button>
                            <Button variant={"ghost"} size={"icon"}
                                onClick={() => {
                                    const node = getNode(nodeId) as AppNode;
                                    const x = node.position.x;
                                    const y = node.position.y + (node.measured?.height ?? 0) + 20;
                                    const newNode = CreateFlowNode(node.data.type, {
                                        x,
                                        y
                                    });
                                    addNodes([newNode])
                                }}
                            >
                                <Copy size={15} className='stroke-green-500' />
                            </Button>
                        </>
                    }
                    <Button variant={"ghost"} size={"icon"} className='drag-handle cursor-grab'>
                        <GripVerticalIcon size={20} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
