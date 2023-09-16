import prismadb from '@/prisma/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import SettingsForm from './components/settings-form'

type Props = {}

interface SettingsPageProps {
  params : {
      storeId: string
  }
}

const Settings : React.FC<SettingsPageProps> =  async ({params}) => {

  const {userId} = auth();

  if(!userId) return null

  const store =await  prismadb.store.findFirst({
    where : {
        id: params.storeId,
        userId 
    }
  }) 

if(!store) return redirect("/")

  return (
    <div className='flex-col'>
        <div className='flex-1 space-x-4'>
          <SettingsForm initalData={store} />
        </div>
    </div>
  )
}

export default Settings