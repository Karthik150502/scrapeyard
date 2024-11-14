'use client'
import { cn } from '@/lib/utils'
import { useReactFlow } from '@xyflow/react'
import React from 'react'

export default function NodeCard({ nodeId, isSelected, children }: { nodeId: string, isSelected: boolean, children: React.ReactNode }) {

    const { getNode, setCenter } = useReactFlow();

    return (
        <div
            onDoubleClick={() => {
                const node = getNode(nodeId);
                if (!node) return;
                const { position, measured } = node;
                if (!position || !measured) return;
                const { width, height } = measured;
                const x = position.x + width! / 2;
                const y = position.y + height! / 2;
                if (x === undefined || y === undefined) return;
                setCenter(x, y, {
                    zoom: 1,
                    duration: 500
                })
            }}
            className={cn('rounded-[5px] cursor-pointer bg-background border w-[420px] text-xs gap-1 felx flex-col', isSelected && 'border-primary')}>
            {children}
        </div>
    )
}
