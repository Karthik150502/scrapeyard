
import React from 'react'
import { montserrat400 } from '../../fonts/montserrat'
import { cn } from '@/lib/utils'
import DesktopSidebard from '@/components/ui/app/DesktopSidebard'
import BreadcrumbHeader from '@/components/ui/app/BreadcrumbHeader'
import { SelectSeparator } from '@/components/ui/select'
import { ModeToggle } from '@/components/ui/themetoggle'
import { SignedIn, UserButton } from '@clerk/nextjs'


export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className={cn('flex h-screen antialiased', montserrat400.className)}>
            <DesktopSidebard />
            <div className='flex flex-col flex-1 min-h-screen'>
                <header className='flex items-center justify-between px-6 py-4 h-[50px] container'>
                    <BreadcrumbHeader />
                    <div className='flex items-center gap-1 '>
                        <ModeToggle />
                        <SignedIn>
                            <UserButton></UserButton>
                        </SignedIn>
                    </div>
                </header>
                <SelectSeparator />
                <div className='overflow-auto'>
                    <div className="flex-1 container py- text-accent-foreground">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
