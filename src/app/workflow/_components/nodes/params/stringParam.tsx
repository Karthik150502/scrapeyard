'use client'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import React, { useEffect, useId, useState } from 'react'
import { ParamProps } from '@/types/appNode'
import { Textarea } from '@/components/ui/textarea'



export default function StringParam({ param, value, updateNodeParamValue, disabled }: ParamProps) {
    const id = useId();

    const [internalValue, setInternalValue] = useState<string>(value);


    useEffect(() => {
        setInternalValue(value)
    }, [value])


    let Component: any = Input;
    if (param.variant === "textarea") {
        Component = Textarea
    }

    return (
        <div className='space-y-1 p-1 w-full'>
            <Label htmlFor={id} className='text-xs flex'>
                {param.name}
                {
                    param.required && <p className='text-red-400'>*</p>
                }
            </Label>
            <Component
                disabled={disabled}
                id={id}
                value={internalValue}
                className='text-xs'
                placeholder='Enter value here'
                onChange={(e: any) => { setInternalValue(e.target.value) }}
                onBlur={(e: any) => updateNodeParamValue(e.target.value)}
            />
            {
                param.helperText && <p className='text-muted-foreground px-2'>
                    {param.helperText}
                </p>
            }
        </div>
    )
}
