"use client"

import { StoreModal } from '@/components/modals/store-modal'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {

  const modal = useStoreModal(state=> state);
  const {storeId} = useParams()

  useEffect(()=>{
    if(!storeId){
      modal.onOpen()
    }
  },[storeId])


  return (
    <StoreModal />
  )
}
 