import React from 'react'
import BillboardClient from './components/billboard-client'

type Props = {}

const Billboards = (props: Props) => {
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4'>
            <BillboardClient />
        </div>
    </div>
  )
}

export default Billboards