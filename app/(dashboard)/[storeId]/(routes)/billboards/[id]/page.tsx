import prismadb from '@/prisma/prismadb'
import BillboardForm from './components/billboard-form'


const Billboard = async ({params}: {params : {id : string}}) => {

    const billboard = await prismadb.billboard.findUnique({
        where:{
            id: params.id
        }
    })
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
      <BillboardForm  initalData={billboard}/>
      </div>
    </div>
  )
}

export default Billboard