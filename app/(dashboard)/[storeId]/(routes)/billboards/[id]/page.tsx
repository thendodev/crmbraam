import prismadb from '@/prisma/prismadb'
import React from 'react'

type Props = {}

const Billboard = async ({params : params : {id : string}}) => {

    const billboard = await prismadb.billboard.findFirst({
        where:{
            id: params.id
        }
    })
  return (
    <div>billboard</div>
  )
}

export default Billboard