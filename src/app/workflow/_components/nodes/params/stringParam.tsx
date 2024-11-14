'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import React, { useId, useState } from 'react'
import { ParamProps } from '@/types/appNodes'

export default function StringParam({ param, value, updateNodeParamValue }: ParamProps) {
    const id = useId();

    const [internalValue, setInternalValue] = useState<string>(value);

    return (
        <div className='space-y-1 p-1 w-full'>
            <Label htmlFor={id} className='text-xs flex'>
                {param.name}
                {
                    param.required && <p className='text-red-400'>*</p>
                }
            </Label>
            <Input
                id={id}
                value={internalValue}
                className='text-xs'
                placeholder='Enter value here'
                onChange={(e) => { setInternalValue(e.target.value) }}
                onBlur={(e) => updateNodeParamValue(e.target.value)}
            />
            {
                param.helperText && <p className='text-muted-foreground px-2'>
                    {param.helperText}
                </p>
            }
        </div>
    )
}
