import { LucideIcon } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactCountWrapper from "@/components/reactCountWrapper"

interface Props {
    title: string,
    value: number,
    icon: LucideIcon
}

export default function StatsCard(props: Props) {
    return (
        <Card className="relative overflow-hidden h-full">
            <CardHeader className='flex'>
                <CardTitle className='text-lg'>
                    {props.title}
                </CardTitle>
                <props.icon
                    size={120}
                    className='absolute text-muted-foreground -bottom-4 -right-8 opacity-10' />
            </CardHeader>
            <CardContent>
                <div className='text-2xl font-bold text-primary'>
                    <ReactCountWrapper value={props.value} />
                </div>
            </CardContent>
        </Card>
    )
}
