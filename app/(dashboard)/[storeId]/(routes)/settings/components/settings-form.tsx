"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Heading from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { toast, useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Store } from '@prisma/client'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface SettingsFormsProps {
  initalData : Store
}


const SettingsformSchema = z.object({
  name: z.string().min(1)
})

type SettingsProps = z.infer<typeof SettingsformSchema>

const SettingsForm : React.FC<SettingsFormsProps> = ({initalData}) => {
  const [open, setOpen] = useState(false)
  const params = useParams();
  const router = useRouter();

  let loading = false;

  const form = useForm<SettingsProps>({
    resolver: zodResolver(SettingsformSchema),
    defaultValues: initalData
  })


  const onSubmit = async(data : SettingsProps )=>{
    try{
      loading = true;
      await axios.patch(`/api/stores/${params.storeId}`, data)
      router.refresh();
      toast({description:"Store name updated"})
    }catch(e){

    } finally{
      loading = false;
    }
  }



  const onDelete = async ()=> {
    try{
      loading = true;
      await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh();
      router.push("/");
      toast({title:"Request Success",description:"Store Deleted"})
    }catch(e){
      toast({ title:"Request Failure", description:"Error, Something happened"})
    }finally{
        loading = false;
      }
    }
  


  return (
    <>
      <div className='flex items-center justify-between m-2'>
        <Heading
         title="setting"
         description="Manage your profile settings"/>
         <Button title="Delete Store"
            variant={"destructive"}
            disabled={loading}
            size={"sm"}
             onClick={()=>(setOpen(true ))} >
          <Trash className='h-4 w-4' />
         </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'>
              <div className='grid grid-cols-3 gap-8'>
                <FormField
                control={form.control}
                name="name"
                  render={({field})=>(
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder='Store Name' {...field} />
                          <FormMessage /> 
                        </FormControl>
                      </FormItem>
                  )} />
              </div>
              <Button disabled={loading} type="submit">Save Changes</Button>
          </form>
      </Form>
    </>
  )
}

export default SettingsForm