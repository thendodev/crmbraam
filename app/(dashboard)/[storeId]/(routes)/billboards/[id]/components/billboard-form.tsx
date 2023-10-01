"use client"

import ImageUpload from '@/components/image-upload'
import AlertModal from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Heading from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { toast, useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Billboard } from '@prisma/client'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface BillboardFormsProps {
  initalData : Billboard | null,
}


const BillboardformSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
})

type BillboardProps = z.infer<typeof BillboardformSchema>

const BillboardForm : React.FC<BillboardFormsProps> = ({initalData}) => {
  const [open, setOpen] = useState(false)
  const params = useParams();
  const router = useRouter();

  let loading = false;

    const title = initalData ? "Edit billboard" : "Create billboard";
    const desc = initalData ? "Edit a billboard" : "Create a new billboard";
    const toastmessage = initalData ? "Billboard updated" : "Billboard Crated";
    const action = initalData ? "Create " : "Save";



  const form = useForm<BillboardProps>({
    resolver: zodResolver(BillboardformSchema),
    defaultValues: initalData || {label: '', imageUrl : ''}
  })


  const onSubmit = async(data : BillboardProps )=>{
    try{
      loading = true;
      if(initalData) await axios.patch(`/api/${params.storeId}/billboards/${initalData.id}`, data)
      if(!initalData) await axios.post(`/api/${params.storeId}/billboards`, data)
      router.refresh();
      toast({description:toastmessage})
    }catch(e){

    } finally{
      loading = false;
    }
  }



  const onDelete = async ()=> {
    try{
      loading = true;
      await axios.delete(`/api/${params.storeId}/billboards/${params.id}`)
      router.refresh();
      router.push("/billboards");
      toast({title:"Request Success",description:"Billboard Deleted"})
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
                 <Button title="Delete billboard"
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
                name="imageUrl"
                  render={({field})=>(
                      <FormItem>
                        <FormLabel>Billboard Image</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value ? [field.value] : []} 
                            disabled={loading}
                            onChange={(url)=>field.onChange(url)}
                            onRemove={()=>field.onChange("")}
                              />
                        </FormControl>
                        <FormMessage /> 
                      </FormItem>
                  )} />
                <FormField
                control={form.control}
                name="label"
                  render={({field})=>(
                      <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder='Billboard label' {...field} />
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

export default BillboardForm