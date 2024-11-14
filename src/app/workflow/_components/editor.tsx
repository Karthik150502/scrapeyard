"use client"

import { Workflow } from '@prisma/client'
import React from 'react'
import { ReactFlowProvider } from "@xyflow/react"
import FlowEditor from './flowEditor'

export default function WorkFlowEditor({ workflow }: { workflow: Workflow }) {
    return (
        <ReactFlowProvider>
            <div className="flex flex-col overflow-hidden w-full h-full">
                <section className='flex h-full overflow-auto'>
                    <FlowEditor workflow={workflow}>

                    </FlowEditor>
                </section>
            </div>
        </ReactFlowProvider>
    )
}
