import BrandLogo from '@/components/ui/logo'
import { Separator } from '@/components/ui/separator'
import { Loader2Icon } from 'lucide-react'
import React from 'react'

export default function SetupLoadingPage() {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center gap-4'>
            <BrandLogo iconSize={50} fontSize='text-3xl' />
            <Separator className="max-w-xs" />
            <div className='flex items-center gap-2 justify-center'>
                <Loader2Icon size={16} className='animate-spin stroke-primary' />
                <p className='text-muted-foreground'>Setting up your Account</p>
            </div>
        </div>
    )
}
