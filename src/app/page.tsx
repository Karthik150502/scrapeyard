import BlurtextAnimation from '@/components/ui/blurTextAnimationWrapper';
import { Button } from '@/components/ui/button';
import BrandLogo from '@/components/ui/logo';
import Link from 'next/link';
import React from 'react'

export default function DashboardHome() {
    return (
        <div className='min-h-screen overflow-hidden relative flex flex-col items-center justify-center gap-4'>
            <BlurtextAnimation size={45}>
                Welcome to Scrapeyard, your very own AI assisted Web Scrape Automation builder.
            </BlurtextAnimation>
            <div className='flex items-center justify-center gap-4'>
                <BrandLogo fontSize={"text-3xl"} />
                <div className='h-[45px] w-[0.5px] bg-white/25'></div>
                <Button variant={"outline"} >
                    <Link href={"/home"}>Let&apos;s get started</Link>
                </Button>
            </div>
        </div >
    )
}

