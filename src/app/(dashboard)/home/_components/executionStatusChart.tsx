'use client'
import React from 'react'
import { getWorlflowEcxecutionStats } from '@/actions/analytics/getWorlflowEcxecutionStats'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";
import { Layers2 } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
type ChartData = Awaited<ReturnType<typeof getWorlflowEcxecutionStats>>;
const CHART_CONFIG = {
    success: {
        label: "Success",
        color: "hsl(var(--chart-2))"
    },
    failed: {
        label: "Failed",
        color: "hsl(var(--chart-1))"
    }
}


export default function ExecutionStatusChart({ data }: {
    data: ChartData
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Layers2 className="w-6 h-6 text-primary" />
                    Workflow execution status
                </CardTitle>
                <CardDescription>
                    Daily number of successfull and failed executions
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={CHART_CONFIG} className="max-h-[200px] w-full">
                    <AreaChart data={data} height={200} accessibilityLayer margin={{
                        top: 20
                    }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey={"date"} />
                        <ChartLegend />
                        <ChartTooltip />
                        <Area dataKey={"success"} />
                        <Area dataKey={"failed"} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
