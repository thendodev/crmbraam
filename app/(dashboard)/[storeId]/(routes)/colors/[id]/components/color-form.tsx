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
import {  Color } from '@prisma/client'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Compact from '@uiw/react-color-compact';

interface CategoryFormsProps {
  initalData : Color | null,
}


const ColorFormSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(3).max(6).regex(/^#/, {message : "String but be valid hex code"}),
})

type ColorFormProps = z.infer<typeof ColorFormSchema>

const ColorsForm : React.FC<CategoryFormsProps> = ({initalData}) => {
  const [open, setOpen] = useState(false)
  const params = useParams();
  const router = useRouter();

  let loading = false;

    const title = initalData ? "Edit color" : "Create color";
    const desc = initalData ? "Edit a color" : "Create a new color";
    const toastmessage = initalData ? "Color updated" : "Color created";
    const action = initalData ? "Create " : "Save";
    const [selectedColor, setSelectedColor] = useState(initalData?.value || '#000'); 
    

  const form = useForm<ColorFormProps>({
    resolver: zodResolver(ColorFormSchema),
    defaultValues: initalData || {name: '', value : selectedColor}
  })


  const onSubmit = async(data : ColorFormProps )=>{
    data.value = selectedColor
    try{
      loading = true;
      if(initalData) await axios.patch(`/api/${params.storeId}/colors/${initalData.id}`, data)
      if(!initalData) await axios.post(`/api/${params.storeId}/colors`, data)
      toast({description:toastmessage})
      router.refresh();

    }catch(e){

    } finally{
      loading = false;
    }
  }



  const onDelete = async ()=> {
    try{
      loading = true;
      await axios.delete(`/api/${params.storeId}/colors/${params.id}`)
      router.refresh();
      router.push("/colors");
      toast({title:"Request Success",description:"Color Deleted"})
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
                 <Button title="Delete color"
            variant={"destructive"}
            disabled={loading}
            color={"sm"}
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
                        <FormLabel>Color name</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder='Color name' {...field} />
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
                          <div className='flex items-center gap-x-4'>
                          <Compact color={selectedColor} onChange={(color)=>setSelectedColor(color.hex)} />
                          <div className='border p-4 rounded-full' style={{backgroundColor : selectedColor}} />
                          </div>
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

export default ColorsForm