"use client"

import AlertModal from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Heading from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import {  Size } from '@prisma/client'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface CategoryFormsProps {
  initalData : Size | null,
}


const SizeFormSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
})

type SizeFormProps = z.infer<typeof SizeFormSchema>

const SizesForm : React.FC<CategoryFormsProps> = ({initalData}) => {
  const [open, setOpen] = useState(false)
  const params = useParams();
  const router = useRouter();

  let loading = false;

    const title = initalData ? "Edit size" : "Create size";
    const desc = initalData ? "Edit a size" : "Create a new size";
    const toastmessage = initalData ? "Size updated" : "Size created";
    const action = initalData ? "Create " : "Save";



  const form = useForm<SizeFormProps>({
    resolver: zodResolver(SizeFormSchema),
    defaultValues: initalData || {name: '', value : ''}
  })


  const onSubmit = async(data : SizeFormProps )=>{
    try{
      loading = true;
      if(initalData) await axios.patch(`/api/${params.storeId}/sizes/${initalData.id}`, data)
      if(!initalData) await axios.post(`/api/${params.storeId}/sizes`, data)
      toast({description:toastmessage})
      router.push(`/${params.storeId}/sizes`);

    }catch(e){

    } finally{
      loading = false;
    }
  }



  const onDelete = async ()=> {
    try{
      loading = true;
      await axios.delete(`/api/${params.storeId}/sizes/${params.id}`)
      router.refresh();
      toast({title:"Request Success",description:"Size Deleted"})
    }catch(e){
      toast({ title:"Request Failure", description:"Error, Something happened"})
    }finally{
        loading = false;
      }
    }
  


  return (
    <>
      <AlertModal isOpen={open} onClose={()=>setOpen(false)} onConfirm={onDelete} loading={loading}/>
      <div className='flex items-center justify-between m-2'>
        <Heading
         title={title}
         description={desc}/>
         {
            initalData && (
                 <Button title="Delete size"
            variant={"destructive"}
            disabled={loading}
            size={"sm"}
             onClick={()=>(setOpen(true ))} >
          <Trash className='h-4 w-4' />
         </Button>
            )
         }
        
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'>
              <div className='grid grid-row-3 gap-8'>
            
                <FormField
                control={form.control}
                name="name"
                  render={({field})=>(
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder='Size name' {...field} />
                        </FormControl>
                        <FormMessage /> 
                      </FormItem>
                  )} />
                <FormField
                control={form.control}
                name="value"
                  render={({field})=>(
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder='Size value' {...field} />
                        </FormControl>
                        <FormMessage /> 
                      </FormItem>
                  )} />
              </div>
              <Button disabled={loading} type="submit">{action}</Button>
          </form>
      </Form>
    </>
  )
}

export default SizesForm