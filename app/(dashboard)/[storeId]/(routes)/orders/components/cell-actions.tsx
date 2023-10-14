"use client"

import React, { useState } from 'react'
import { OrderColumnProps } from './columns'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Copy, Edit, MoreHorizontal, Trash, WorkflowIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import AlertModal from '@/components/modals/alert-modal'


interface CellActionProps {
    data : OrderColumnProps
}

const CallActions : React.FC<CellActionProps> = ({data}) => {

    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState<boolean>(false);
    let loading = false;

    const onCopy =(id: string) => {
        navigator.clipboard.writeText(id);
        toast({title:"Copy ID", description : "Billboard id copied"})
    }


    const onDelete = async ()=> {
        try{
          loading = true;
          await axios.delete(`/api/${params.storeId}/billboards/${params.id}`)
          router.refresh();
          router.push(`/${params.storeId}/billboards/`);
          toast({title:"Request Success",description:"Billboard Deleted"})
        }catch(e){
          toast({ title:"Request Failure", description:"Error, Something happened"})
        }finally{
            loading = false;
            setOpen(true)
          }
        }
      

  return (
    <div>
        <AlertModal loading={loading} onConfirm={()=>onDelete()} onClose={()=>setOpen(false)} isOpen={open} />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className='h-8 w-8 p-0'>
                    <span className='sr-only'>Open Menu</span>
                    <MoreHorizontal className=' h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuLabel className='flex row-auto align-middle content-center' >
                   <WorkflowIcon className='mr-2 h-4 w-4' /> Actions
                </DropdownMenuLabel>
                <Separator />
                <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                    <Copy className='mr-2 h-4 w-4' /> Copy id
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/billboards/${data.id}`)}>
                    <Edit className='mr-2 h-4 w-4' /> Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setOpen(true)}>
                    <Trash className='mr-2 h-4 w-4' /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default CallActions