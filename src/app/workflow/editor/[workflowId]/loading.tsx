import { Loader } from 'lucide-react'
import React from 'react'

export default function WorkdflowLoading() {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Loader className='animate-spin' size={30} />
    </div>
  )

}
