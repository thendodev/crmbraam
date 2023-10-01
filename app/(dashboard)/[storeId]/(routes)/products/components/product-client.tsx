"use client"
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Billboard } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ProductColumnProps, columns } from './columns'

interface ProductClientProps {
  data : ProductColumnProps[]
}

const ProductClient : React.FC<ProductClientProps> = ({data}) => {

  const router = useRouter();
  const params = useParams();


  return (
    <>
    <div className='flex items-center justify-between'>
      <Heading title="Products" description='manage your products' />
      <Button onClick={()=>router.push(`/${params.storeId}/products/new`)}>
        <Plus className="mr-2 h-4 w-4" /> Add New
      </Button>
    </div>
    <Separator />
    <DataTable searchKey='name' columns={columns} data={data} />
    </>
  )
}

export default ProductClient