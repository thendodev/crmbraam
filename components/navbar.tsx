import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import { MainNav } from './main-nav'
import Switcher from './store-switcher'
import { redirect } from 'next/navigation'
import prismadb from '@/prisma/prismadb'

type Props = {}

const Navbar = async (props: Props) => {

  const {userId} = auth();


const store = userId ? await prismadb.store.findMany({
    where:{
      userId
    }
  }) : null; 


  return (
<div className='border-b'>
        <div className='flex h-16 items-center px-4'>
            <div>
              {/* <Switcher items={store} className=""/> */}
            </div>
            
            <MainNav className='mx-6'/>
            <div className='ml-auto flex items-center space-x-4'>
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
        
        </div>  )
}

export default Navbar