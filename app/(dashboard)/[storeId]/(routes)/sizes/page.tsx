import React from 'react'
import SizesClient from './components/sizes-client'
import prismadb from '@/prisma/prismadb'
import { SizesColumnProps } from './components/columns'


const Sizes = async ({params }: {params : {storeId : string}}) => {

  const sizes = await prismadb.size.findMany({
    where : {
      storeId : params.storeId
    },
    orderBy : {
      createdAt : 'desc'
    }
  })

  const formattedSizes : SizesColumnProps[] = sizes.map((i)=>({
    id : i.id,
    name : i.name,
    value: i.value,
    createdAt : i.createdAt.toDateString()
  }))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <SizesClient data={formattedSizes}/>
        </div>
    </div>
  )
}

export default Sizes