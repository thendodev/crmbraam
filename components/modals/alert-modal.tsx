import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { toast } from '../ui/use-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'


interface AlertModalProps {
    isOpen : boolean,
    onClose : ()=> void,
    onConfirm : ()=>void,
    loading: boolean
}

const AlertModal = ({isOpen,onClose,onConfirm,loading}: AlertModalProps) => {
  const [isMounted, setisMounted] =useState(false)
    const params = useParams()
    const router = useRouter()
  useEffect(()=>{
    setisMounted(true);
  },[])
  if(!isMounted) return null;
  

  const onContinue = async ()=>{
    try{
            axios.delete(`api/stores/${params.storeId}`);
            router.refresh();
            router.push("/");
    }catch(e){
        toast({description:"something went wrong"})
    }
  }


    return ( 
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
  )
}

export default AlertModal
