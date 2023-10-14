"use client"
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ColorsColumnProps, columns } from './columns'

interface ColorsClientProps {
  data : ColorsColumnProps[]
}

const ColorsClient : React.FC<ColorsClientProps> = ({data}) => {

  const router = useRouter();
  const params = useParams();


  return (
    <>
    <div className='flex items-center justify-between'>
      <Heading title="Colors" description='manage your colors' />
      <Button onClick={()=>router.push(`/${params.storeId}/colors/new`)}>
        <Plus className="mr-2 h-4 w-4" /> Add New
      </Button>
    </div>
    <Separator />
    <DataTable searchKey='name' columns={columns} data={data} />
    </>
  )
}

export default ColorsClient