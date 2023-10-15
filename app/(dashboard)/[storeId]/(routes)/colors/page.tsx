import React from 'react'
import ColorsClient from './components/colors-client'
import prismadb from '@/prisma/prismadb'
import { ColorsColumnProps } from './components/columns'
import { toast } from '@/components/ui/use-toast'


const Colors = async ({params }: {params : {storeId : string}}) => {

  const colors = await prismadb.color.findMany({
    where : {
      storeId : params.storeId
    },
    orderBy : {
      createdAt : 'desc'
    }
  }).catch(()=>[]);
  if(colors.length === 0) {
    toast({description: "There are no colors yet", title: "info"})
  }
  const FormattedColors : ColorsColumnProps[] = colors.map((i)=>({
    id : i.id,
    name : i.name,
    value: i.value,
    createdAt : i.createdAt.toDateString()
  }))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <ColorsClient data={FormattedColors}/>
        </div>
    </div>
  )
}

export default Colors