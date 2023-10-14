import React from 'react'
import BillboardClient from './components/categories-client'
import prismadb from '@/prisma/prismadb'
import { CategoriesColumnProps } from './components/columns'

type Props = {}

const Categories = async ({params }: {params : {storeId : string}}) => {

  const categories = await prismadb.category.findMany({
    where : {
      storeId : params.storeId
    },
    include : {
      billboard : true
    },
    orderBy : {
      createdAt : 'desc'
    }
  })

  const formattedCategories : CategoriesColumnProps[] = categories.map((i)=>({
    id : i.id,
    name : i.name,
    billboardLabel : i.billboard.label,
    createdAt : i.createdAt.toDateString()
  }))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <BillboardClient data={formattedCategories}/>
        </div>
    </div>
  )
}

export default Categories