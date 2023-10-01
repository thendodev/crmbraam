import prismadb from '@/prisma/prismadb'
import SizesForm from './components/size-form'


const Size = async ({params}: {params : {id : string, storeId : string}}) => {

    const size = await prismadb.size.findUnique({
        where:{
            id: params.id
        }
    })




  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
      <SizesForm  initalData={size}/>
      </div>
    </div>
  )
}

export default Size