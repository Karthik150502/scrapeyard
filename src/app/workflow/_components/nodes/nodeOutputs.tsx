'use client'
import React from 'react'

export default function NodeOutputs({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex flex-col divide-y gap-1'>
            {children}
        </div>
    )
}
