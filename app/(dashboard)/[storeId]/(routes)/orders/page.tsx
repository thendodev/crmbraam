import React from 'react'
import BillboardClient from './components/order-client'
import prismadb from '@/prisma/prismadb'
import { OrderColumnProps } from './components/columns'
import { currencyFormmater } from '@/lib/utils'
import { redirect } from 'next/navigation'

type Props = {}

const Orders = async ({params }: {params : {storeId : string}}) => {

  const orders = await prismadb.order.findMany({
    where : {
      storeId : params.storeId
    },
    include : {
      orderItems : {
        include : {
          product : true
        }
      }
    },
    orderBy : {
      createdAt : 'desc'
    }
  });

  const formattedOrders : OrderColumnProps[] = orders.map((i)=>({
    id : i.id,
    phone : i.phone,
    address : i.address,
    products : i.orderItems.map(prod => prod.product.name).join(", "),
    totalPrice : currencyFormmater.format(i.orderItems.reduce((total, item)=>{
      return total + Number(item.product.price)
    },0)),
    isPaid : i.isPaid,
    createdAt : i.createdAt.toDateString()
  }))

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <BillboardClient data={formattedOrders}/>
        </div>
    </div>
  )
}

export default Orders