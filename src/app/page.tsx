import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

export default function DashboardHome() {
    return (
        <div className='min-h-screen overflow-hidden relative flex flex-col items-center justify-center gap-2'>
            <p className='flex text-2xl'>Welcome to Scrapeyard, your very own AI assisted Web Scrape Automation builder.</p>
            <Button variant={"outline"} >
                <Link href={"/home"}>Dashboard</Link>
            </Button>
        </div>
    )
}

