"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

interface IamgeUploadProps  {
    disabled : boolean;
    onChange : (value : string) => void;
    onRemove : (value : string) => void;
    value : string[];
}
const ImageUpload : React.FC<IamgeUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    const onUpload = (result : any)=>{
        onChange(result.info.secure_url)
    }


    if(!isMounted) return null;
  return (
    <div>
        <div className='mb-4 flex items-center gap-4'>
            {value?.map((url)=>(
                <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden '>
                    <div className='z-10 absolute top-2 right-2'>
                        <Button type='button' onClick={()=>onRemove(url)}>
                            <Trash className='h-4 w-4' />
                        </Button>
                    </div>
                    <Image src={url} fill className='object-cover' alt='product'  />
                </div>
            ))}

        </div>
        <CldUploadWidget onUpload={onUpload} uploadPreset="ff7czwu7">
            {({open})=>{
                const onClick =()=>{
                    open();
                }

                return (
                    <Button type="button" disabled={disabled} variant="secondary" onClick={onClick}>
                        <ImagePlus className='h-4 w-4 mr-2' /> Upload Image
                    </Button>
                )
            }}
        </CldUploadWidget>
    </div>
  )
}

export default ImageUpload