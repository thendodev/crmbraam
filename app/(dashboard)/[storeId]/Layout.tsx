import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider, auth } from '@clerk/nextjs'
import { ModalProvider } from '@/providers/modal-provider'
import { Toaster } from '@/components/ui/toaster'
import {redirect} from "next/navigation"
import prismadb from '@/prisma/prismadb'
import Navbar from '@/components/navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'dashboard',
  description: 'dashboard',
}

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode,
  params: {storeId: string}
}) {
    
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({ 
    where: {
      id: params.storeId,
      userId,
    }
   });

  if (!store) {
    redirect('/');
  };


  return (
    <>
    <Navbar/>
    {children}
    </>
          
        

  )
}
