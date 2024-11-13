import React from 'react'
import { montserrat400 } from './fonts/montserrat'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function Notfound() {
    return (
        <div className={cn("flex flex-col items-center justify-center min-h-screen p-4", montserrat400.className)}>
            <div className="text-center">
                <h1 className='text-6xl font-bold text-primary'>
                    404
                </h1>
                <h3 className="text-2xl font-semibold mb-2">
                    Oops...Page not found.....
                </h3>
                <p className='text-muted-foreground mb-4 max-w-d'>
                    Dont worry, it's easy to get lost where there is so much to explore.
                </p>
                <div className='flex flex-col sm:flex-row justify-center gap-4'>
                    <Link href={"/"} className='flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors'>
                        <ArrowLeft className='w-4 h-4 mr-2' />
                        back to dashbord?
                    </Link>
                </div>

                <footer className='mt-8 text-center text-sm text-muted-foreground'>
                    If you think this is an error, kindly contact our support team.
                </footer>
            </div>
        </div>
    )
}
