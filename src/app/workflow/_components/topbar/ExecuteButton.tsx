'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import useExecutionPlan from '@/hooks/use-execution-plan';
import { toast } from 'sonner';
import Error from 'next/error';

export default function ExecuteButton({ workflowId }: { workflowId: string }) {

    const generate = useExecutionPlan();
    const [executing, setExecuting] = useState<boolean>(false);


    const handleExecution = () => {
        try {
            setExecuting(true);
            const plan = generate();
            console.log("-----plan------");
            console.table(plan)
            console.log("-----plan------");
        } catch (e) {
            console.log("Some error occured.")
            toast.error(e.message)
        } finally {
            setExecuting(false);
        }

    }

    return (
        <Button
            variant={"outline"}
            className='flex items-center gap-2'
            onClick={() => {
                handleExecution();
            }}>
            {
                executing ? <Pause strokeWidth={1.5} size={16} className='stroke-red-500' /> : <Play strokeWidth={1.5} size={16} className='stroke-blue-700' />
            }

            {executing ? "Executing" : "Execute"}
        </Button>
    )
}
