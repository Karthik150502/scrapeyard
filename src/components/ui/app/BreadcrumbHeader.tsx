'use client'
import { usePathname } from 'next/navigation';
import { BreadcrumbItem, BreadcrumbSeparator, BreadcrumbLink, Breadcrumb, BreadcrumbList } from '../breadcrumb';
import React from 'react'
import MobileSidebar from './mobileSidebar';

export default function BreadcrumbHeader() {


    const pathname = usePathname();
    const paths = pathname === "/" ? [""] : pathname?.split("/")


    return (
        <div className='flex items-center flex-start'>
            <MobileSidebar />
            <Breadcrumb>
                <BreadcrumbList>
                    {
                        paths.map((p, i) => <React.Fragment key={i}>
                            <BreadcrumbItem>
                                <BreadcrumbLink className='capitalize' href={`/${p}`}>
                                    {p === "" ? "home" : p}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {(i < paths.length - 1) && <BreadcrumbSeparator />}
                        </React.Fragment>)
                    }
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
