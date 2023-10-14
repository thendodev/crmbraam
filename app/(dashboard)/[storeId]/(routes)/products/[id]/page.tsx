import prismadb from '@/prisma/prismadb'
import ProductForm from './components/product-form'


const Product = async ({params}: {params : {id : string, storeId : string}}) => {

  const products = await prismadb.product.findUnique({
    where : {
      id : params.id
    },
    include : {
      image : true
    }
  })

  const categories = await prismadb.category.findMany({
    where:{
      storeId : params.storeId
    }
  })

  const sizes = await prismadb.size.findMany({
    where:{
      storeId : params.storeId
    }
  })
 
  const colors = await prismadb.color.findMany({
    where:{
      storeId : params.storeId
    }
  })

  

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
      <ProductForm
        sizes={sizes}
        colors={colors}
        categories={categories}
        initialData={products}/>
      </div>
    </div>
  )
}

export default Product