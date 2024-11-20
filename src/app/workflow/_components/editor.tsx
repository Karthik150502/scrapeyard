"use client"

import { Workflow } from '@prisma/client'
import React from 'react'
import { ReactFlowProvider } from "@xyflow/react"
import FlowEditor from './flowEditor'
import Topbar from './topbar/topbar'
import TaskMenu from '@/app/(dashboard)/workflows/_components/TaskMenu'
import { FlowValidationContextProvider } from '@/components/context/flowValidationContext'

export default function WorkFlowEditor({ workflow }: { workflow: Workflow }) {
    return (
        <FlowValidationContextProvider>
            <ReactFlowProvider>
                <div className="flex flex-col overflow-hidden w-full h-full">
                    <Topbar title='Workflow editor' subtitle={workflow.name} workflowId={workflow.id} />
                    <section className='flex h-full overflow-auto'>
                        <TaskMenu />
                        <FlowEditor workflow={workflow} />
                    </section>
                </div>
            </ReactFlowProvider>
        </FlowValidationContextProvider>
    )
}
