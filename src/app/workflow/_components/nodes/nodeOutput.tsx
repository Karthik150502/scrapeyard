import { cn } from '@/lib/utils'
import { TaskParam } from '@/types/task'
import { Handle, Position } from '@xyflow/react'
import React from 'react'
import { ColorForHandle } from './common'

type Props = {
    output: TaskParam,
}



export default function NodeOutput({ output }: Props) {
    return (
        <div className='flex justify-end relative p-3 bg-secondary w-full'>
            <p className='text-muted-foreground text-xs'>{output.name}</p>
            {
                !output.hideHandle && <Handle id={output.name} type="source" position={Position.Right} className={cn('!bg-muted-foreground !border-2 !border-background !-right-2 !w-3 !h-3',
                    ColorForHandle[output.type]
                )} />
            }
        </div>
    )
}
