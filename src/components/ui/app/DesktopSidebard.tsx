'use client'


import { dashboardRoutes } from '@/lib/config'
import React from 'react'
import BrandLogo from '../logo';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../button';
import { usePathname } from 'next/navigation';
import UserAvailableCredits from './userAvailableCredits';
export default function DesktopSidebard() {

    const pathName = usePathname();
    const activeRoute = dashboardRoutes.find((r) => r.path.length > 0 && pathName.includes(r.path)) || dashboardRoutes[0]

    return (
        <div className='hidden relative md:block min-w-[280px] h-screen overflow-hidden bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-1 border w-[280px]'>
            <div className='flex items-center justify-center gap-2 border-b-[1px] border-separate p-4'>
                <BrandLogo />
            </div>
            <div className='p-2'><UserAvailableCredits /></div>
            <div className='flex flex-col p-2 gap-y-2'>
                {
                    dashboardRoutes.map((r) => <Link href={r.path} key={r.path} className={cn("flex items-center justify-start gap-x-2 !rounded-md", buttonVariants({ variant: activeRoute.path == r.path ? "sidebarActiveItem" : "sidebarItem" }))}

                    >
                        <r.icon size={18} strokeWidth={1} />
                        {r.label}
                    </Link>)
                }
            </div>
        </div>
    )
}
