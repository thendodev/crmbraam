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
import { Billboard, Category } from '@prisma/client'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface CategoryFormsProps {
  initalData : Category | null,
  billboards : Billboard[] | null
}


const CategoryFormSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
})

type CategoryFormProps = z.infer<typeof CategoryFormSchema>

const CategoryForm : React.FC<CategoryFormsProps> = ({initalData, billboards}) => {
  const [open, setOpen] = useState(false)
  const params = useParams();
  const router = useRouter();

  let loading = false;

    const title = initalData ? "Edit category" : "Create category";
    const desc = initalData ? "Edit a category" : "Create a new category";
    const toastmessage = initalData ? "Category updated" : "Category created";
    const action = initalData ? "Create " : "Save";



  const form = useForm<CategoryFormProps>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: initalData || {name: '', billboardId : ''}
  })


  const onSubmit = async(data : CategoryFormProps )=>{
    try{
      loading = true;
      if(initalData) await axios.patch(`/api/${params.storeId}/categories/${initalData.id}`, data)
      if(!initalData) await axios.post(`/api/${params.storeId}/categories`, data)
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
      await axios.delete(`/api/${params.storeId}/categories/${params.id}`)
      router.refresh();
      router.push("/categories");
      toast({title:"Request Success",description:"Category Deleted"})
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
                 <Button title="Delete category"
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
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder='Catgory name' {...field} />
                        </FormControl>
                        <FormMessage /> 
                      </FormItem>
                  )} />
                <FormField
                control={form.control}
                name="billboardId"
                  render={({field})=>(
                      <FormItem>
                        <FormLabel>Billboard</FormLabel>
                          <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                        <FormControl>
                        <SelectTrigger defaultValue={field.value} placeholder="Select a billboard">
                            <SelectValue 
                              defaultValue={field.value}
                              placeholder="Select a billboard"
                              />
                        </SelectTrigger>
                        </FormControl>
                          <SelectContent>
                            {billboards?.map((billboard)=>(
                              <SelectItem
                                key={billboard.id}
                                value={billboard.id}
                              >
                                {billboard.label}
                                </SelectItem>
                            ))}
                          </SelectContent>
                          </Select>
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

export default CategoryForm