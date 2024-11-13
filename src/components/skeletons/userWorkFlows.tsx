import React from 'react'
import { Skeleton } from '../ui/skeleton'
// import { Skeleton } from '../ui/skeleton'

export default function UserWorkFlowsSk() {
    return (
        <div className='space-y-2'>
            {
                ["", "", "", ""].map((i) => {
                    return <Skeleton key={i} className='h-32 w-full' />
                })
            }
        </div>
    )
}
