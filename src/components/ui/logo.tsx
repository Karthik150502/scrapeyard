import { cn } from '@/lib/utils'
import { MousePointerClick } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function BrandLogo({ fontSize = "text-2xl", iconSize = 20 }: { fontSize?: string, iconSize?: number }) {

    return (
        <Link href={"/"} className={cn("flex items-center justify-center gap-x-2", fontSize)}>
            <div className="rounded-xl bg-gradient-to-tl from-purple-700 to-purple-400 p-2">
                <MousePointerClick size={iconSize} className='stroke-white' />
            </div>
            <div className='font-bold'>
                <span className='bg-gradient-to-tr from-purple-700 to-purple-400 bg-clip-text text-transparent'>
                    Scrape
                </span>
                <span className='text-stone-700 dark:text-stone-300'>Yard</span>
            </div>
        </Link>
    )
}
