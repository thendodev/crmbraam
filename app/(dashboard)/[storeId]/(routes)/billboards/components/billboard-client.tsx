"use client"
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

const BillboardClient = (props: Props) => {

  const router = useRouter();
  const params = useParams();


  return (
    <div className='flex items-center justify-between'>
      <Heading title="Billboard" description='management your billboards' />
      <Button onClick={()=>router.push(`/${params.storeId}/billboard/new`)}>
        <Plus className="mr-2 h-4 w-4" /> Add New
      </Button>
    </div>
  )
}

export default BillboardClient