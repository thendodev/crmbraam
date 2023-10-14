"use client"

import ImageUpload from '@/components/image-upload'
import AlertModal from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Heading from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { toast, useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Image, Product,Category, Size, Color } from '@prisma/client'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'


interface ProductFormsProps {
  initialData : Product & {image : Image[]}| null,
  sizes: Size[],
  colors : Color[],
  categories : Category[]
}


const ProductFormSchema = z.object({
  name: z.string().min(1),
  image: z.object({url : z.string()}).array(),
  price : z.coerce.number().min(1),
  categoryId : z.string().min(1),
  colorId : z.string().min(1),
  sizeId : z.string().min(1),
  isFeatured : z.boolean(),
  isArchived : z.boolean()
})

type ProductProps = z.infer<typeof ProductFormSchema>

const ProductForm : React.FC<ProductFormsProps> = ({initialData, colors, categories,sizes}) => {
  const [open, setOpen] = useState(false)
  const params = useParams();
  const router = useRouter();

  let loading = false;

    const title = initialData ? "Edit product" : "Create product";
    const desc = initialData ? "Edit a product" : "Create a new product";
    const toastmessage = initialData ? "Product updated" : "Product Crated";
    const action = initialData ? "Create " : "Save";



  const form = useForm<ProductProps>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: initialData ? {
      ...initialData, price : parseFloat(String(initialData?.price))
    } : {
      name: '',
      image : [],
      price : 0,
      categoryId : '',
      colorId : '',
      sizeId : '',
      isFeatured : false,
      isArchived : false
    }
  })


  const onSubmit = async(data : ProductProps )=>{
    try{
      loading = true;
      if(initialData) await axios.patch(`/api/${params.storeId}/products/${initialData.id}`, data)
      if(!initialData) await axios.post(`/api/${params.storeId}/products`, data)
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
      await axios.delete(`/api/${params.storeId}/products/${params.id}`)
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast({title:"Request Success",description:"Product Deleted"})
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
            initialData && (
                 <Button title="Delete product"
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
                name="image"
                  render={({field})=>(
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value.map(image=> image.url)} 
                            disabled={loading}
                            onChange={(url)=>field.onChange([...field.value, {url}])}
                            onRemove={(url)=>field.onChange([...field.value.filter(prev=> prev.url !== url)])}
                              />
                        </FormControl>
                        <FormMessage /> 
                      </FormItem>
                  )} />
                <FormField
                control={form.control}
                name="name"
                  render={({field})=>(
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder='name' {...field} />
                        </FormControl>
                        <FormMessage /> 
                      </FormItem>
                  )} />
                <FormField
                control={form.control}
                name="price"
                  render={({field})=>(
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" disabled={loading} placeholder='ex. 9.99' {...field} />
                        </FormControl>
                        <FormMessage /> 
                      </FormItem>
                  )} />
                  <FormField
                control={form.control}
                name="categoryId"
                  render={({field})=>(
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                          <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                        <FormControl>
                        <SelectTrigger defaultValue={field.value} placeholder="Select a category">
                            <SelectValue 
                              defaultValue={field.value}
                              placeholder="Select a category"
                              />
                        </SelectTrigger>
                        </FormControl>
                          <SelectContent>
                            {categories?.map((cat)=>(
                              <SelectItem
                                key={cat.id}
                                value={cat.id}
                              >
                                {cat.name}
                                </SelectItem>
                            ))}
                          </SelectContent>
                          </Select>
                        <FormMessage /> 
                      </FormItem>
                  )} />
                  <FormField
                control={form.control}
                name="sizeId"
                  render={({field})=>(
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                          <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                        <FormControl>
                        <SelectTrigger defaultValue={field.value} placeholder="Select a size">
                            <SelectValue 
                              defaultValue={field.value}
                              placeholder="Select a size"
                              />
                        </SelectTrigger>
                        </FormControl>
                          <SelectContent>
                            {sizes?.map((size)=>(
                              <SelectItem
                                key={size.id}
                                value={size.id}
                              >
                                {size.name} - {size.value}
                                </SelectItem>
                            ))}
                          </SelectContent>
                          </Select>
                        <FormMessage /> 
                      </FormItem>
                  )} />
                  <FormField
                control={form.control}
                name="colorId"
                  render={({field})=>(
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                          <Select
                            disabled={loading}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                        <FormControl>
                        <SelectTrigger defaultValue={field.value} placeholder="Select a color">
                            <SelectValue 
                              defaultValue={field.value}
                              placeholder="Select a color"
                              />
                        </SelectTrigger>
                        </FormControl>
                          <SelectContent>
                            {colors?.map((cat)=>(
                              <SelectItem
                                key={cat.id}
                                value={cat.id}
                                style={{backgroundColor: cat.value}}
                              >
                                {cat.name}
                                </SelectItem>
                            ))}
                          </SelectContent>
                          </Select>
                        <FormMessage /> 
                      </FormItem>
                  )} />
              <FormField
                control={form.control}
                name="isFeatured"
                  render={({field})=>(
                      <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded'>
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className='space-y-1 leading-none'>
                        <FormLabel>Featured</FormLabel>
                        <FormDescription>
                          This product will appear on the home page
                        </FormDescription>
                        </div>
                        <FormMessage /> 
                      </FormItem>
                  )} />
              <FormField
                control={form.control}
                name="isArchived"
                  render={({field})=>(
                      <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded'>
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className='space-y-1 leading-none'>
                        <FormLabel>Archived</FormLabel>
                        <FormDescription>
                          This product is currently not in stock
                        </FormDescription>
                        </div>
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

export default ProductForm