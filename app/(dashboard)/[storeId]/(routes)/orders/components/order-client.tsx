"use client"
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Billboard } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { OrderColumnProps, columns } from './columns'

interface OrderClientProps {
  data : OrderColumnProps[]
}

const OrderClient : React.FC<OrderClientProps> = ({data}) => {

  const router = useRouter();
  const params = useParams();


  return (
    <>
    <div className='flex items-center justify-between'>
      <Heading title="Orders" description='manage your orders' />
      <Button onClick={()=>router.push(`/${params.storeId}/orders/new`)}>
        <Plus className="mr-2 h-4 w-4" /> Add New
      </Button>
    </div>
    <Separator />
    <DataTable searchKey='label' columns={columns} data={data} />
    </>
  )
}

export default OrderClient