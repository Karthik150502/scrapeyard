"use client"

import { getAvailableCredits } from '@/actions/billing/getAvailableCredits'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { CoinsIcon, Loader2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import CountUpWrapper from './countUpWrapper'
import { buttonVariants } from '../button'

export default function UserAvailableCredits() {
    const query = useQuery({
        queryKey: ["user-avl-credits"],
        queryFn: async () => await getAvailableCredits(),
        refetchInterval: 30 * 1000
    })
    return (
        <Link href={"/billing"} className={cn('w-full space-x-2 flex items-center', buttonVariants({
            variant: "outline"
        }))}>
            <CoinsIcon size={20} className="text-primary" />
            <span className="capitalize font-semibold">
                {query.isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {(query.data && !query.isLoading) && <CountUpWrapper value={query.data} />}
                {(query.data === undefined && !query.isLoading) && "--"}
            </span>
        </Link>
    )
}
