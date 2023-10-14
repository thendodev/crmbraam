import prismadb from '@/prisma/prismadb'
import CategoryForm from './components/category-form';


const Category = async ({params}: {params : {id : string, storeId : string}}) => {

    const category = await prismadb.category.findUnique({
        where:{
            id: params.id
        }
    })


const billboards = await prismadb.billboard.findMany({
  where :{
    storeId : params.storeId 
  }
});



  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
      <CategoryForm billboards={billboards}  initalData={category}/>
      </div>
    </div>
  )
}

export default Category