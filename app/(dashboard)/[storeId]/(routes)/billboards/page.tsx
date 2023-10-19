import React from 'react'
import BillboardClient from './components/billboard-client'
import prismadb from '@/prisma/prismadb'
import { BillboardColumnProps } from './components/columns'

type Props = {}

const Billboards = async ({params }: {params : {storeId : string}}) => {

  const billboards = await prismadb.billboard.findMany({
    where : {
      storeId : params.storeId
    },
    orderBy : {
      createdAt : 'desc'
    }
  }) || [];

  const formattedBillboards : BillboardColumnProps[] = billboards.map((i)=>({
    id : i.id,
    label : i.label,
    createdAt : i.createdAt.toDateString()
  }))

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <BillboardClient data={formattedBillboards}/>
        </div>
    </div>
  )
}

export default Billboards