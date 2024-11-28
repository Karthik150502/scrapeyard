import React from 'react'
import { Skeleton } from '../ui/skeleton'
// import { Skeleton } from '../ui/skeleton'

export default function UserWorkFlowsSk() {
    return (
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
            {
                ["", "", "", ""].map((i) => {
                    return <Skeleton key={i} className='h-[200px] w-full' />
                })
            }
        </div>
    )
}


