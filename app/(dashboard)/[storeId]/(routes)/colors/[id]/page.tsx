import prismadb from '@/prisma/prismadb'
import ColorsForm from './components/color-form'


const Color = async ({params}: {params : {id : string, storeId : string}}) => {

    const color = await prismadb.color.findUnique({
        where:{
            id: params.id
        }
    })




  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
      <ColorsForm  initalData={color}/>
      </div>
    </div>
  )
}

export default Color