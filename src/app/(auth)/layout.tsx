import BrandLogo from '@/components/ui/logo'
import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex flex-col items-center justify-start h-screen gap-4 pt-8'>
            <BrandLogo />
            {children}
        </div>
    )
}
