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
import { Modal } from '../ui/modal'


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
  


    return ( 
      <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>Continue</Button>
      </div>
    </Modal>
  )
}

export default AlertModal
