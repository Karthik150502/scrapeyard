'use client'
import { dashboardRoutes } from '@/lib/config';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../sheet';
import { Button, buttonVariants } from '../button';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import BrandLogo from '../logo';
import { cn } from '@/lib/utils';

export default function MobileSidebar() {


    const [isOpen, setOpen] = useState<boolean>(false);
    const pathName = usePathname();
    const activeRoute = dashboardRoutes.find((r) => r.path.length > 0 && pathName.includes(r.path)) || dashboardRoutes[0]
    return (
        <div className='block border-separate bg-background md:hidden'>
            <nav className='flex items-center justify-between container px-8'>
                <Sheet open={isOpen} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                            <MenuIcon strokeWidth={1.5} size={20} />
                        </Button>
                    </SheetTrigger>

                    <SheetContent className='w-[400px] sm:w-[500px] space-y-4' side={"left"}>
                        <BrandLogo />
                        <div className='flex flex-col gap-y-2 w-full'>
                            {
                                dashboardRoutes.map((r) => <Link href={r.path} key={r.path} className={cn("flex items-center justify-start gap-x-2", buttonVariants({ variant: activeRoute.path == r.path ? "sidebarActiveItem" : "sidebarItem" }))}
                                    onClick={() => { setOpen(false) }}
                                >
                                    <r.icon size={18} strokeWidth={1.5} />
                                    {r.label}
                                </Link>)
                            }
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    )
}
