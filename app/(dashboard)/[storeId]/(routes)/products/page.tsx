import React from 'react'
import ProductClient from './components/product-client'
import prismadb from '@/prisma/prismadb'
import { ProductColumnProps } from './components/columns'
import { currencyFormmater } from '@/lib/utils'

type Props = {}

const Products = async ({params }: {params : {storeId : string}}) => {

  const products = await prismadb.product.findMany({
    where : {
      storeId : params.storeId
    },
    include : {
      category : true,
      size : true,
      color : true
    },
    orderBy : {
      createdAt : 'desc'
    }
  })

  const formattedProducts : ProductColumnProps[] = products.map((i)=>({
    id : i.id,
    name : i.name,
    isFeatured : i.isFeatured,
    isArchived : i.isArchived,
    price : currencyFormmater.format(i.price.toNumber()),
    category : i.category.name,
    size : i.size.name,
    color : i.color.value,
    createdAt : i.createdAt.toDateString()
  }))

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <ProductClient data={formattedProducts}/>
        </div>
    </div>
  )
}

export default Products