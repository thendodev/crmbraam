import prismadb from "@/prisma/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export const GET = (req: Request, {params}: {params : {id : string}}) => {
    try{
        if(!params.id) return new NextResponse("Product id is required",{status : 400});
        const {searchParams} = new URL(req.url);
        const isFeatured = searchParams.get("categoryId") || undefined;

        
        const products = prismadb.product.findUnique({
            where : {
                id : params.id,
                isFeatured : isFeatured ? true : undefined,
                isArchived: false
            },
            include : {
                image : true,
                category : true,
                color : true,
                size : true
            }
        })
        return NextResponse.json(products)

    }catch(e){
        console.log('[Product_GET] : ', e)
        return new NextResponse('Internal Error', {status: 400})
    }
}


export async function PATCH( req: Request,{params} : {params : {storeId : string, id : string}}){
    try{
        const {userId} = auth();

        const {name, image, price, categoryId, sizeId, colorId, isFeatured, isArchived} = await req.json();
        
        if(!name) return new NextResponse("name is required", {status: 401 })
        if(!image) return new NextResponse("image  is required", {status: 401 })
        if(!price) return new NextResponse("price  is required", {status: 401 })
        if(!categoryId) return new NextResponse("category id  is required", {status: 401 })
        if(!sizeId) return new NextResponse("size id  is required", {status: 401 })
        if(!colorId) return new NextResponse("color id  is required", {status: 401 })
        if(!isFeatured) return new NextResponse("featured property  is required", {status: 401 })
        if(!isArchived) return new NextResponse("archived property is required", {status: 401 })
        if(!userId) return new NextResponse("unathuanticated", {status: 400})
        if(!params.storeId) return new  NextResponse("Store id is required", {status:400 })

        const product = await prismadb.product.update({
            where :{
                id: params.id,
                storeId : params.storeId
            },
            data:{
                name,
                image : {
                    deleteMany : {}
                },
                price,
                categoryId,
                sizeId,
                colorId,
                isFeatured,
                isArchived,
            }
        })

        const newProduct = await prismadb.product.update({
            where : {
                id : product.id
            },
            data : {
                image:{
                    createMany : {
                        data : [...image.map((image : {url : string })=> image)]
                    }
                }
            }
        })

        return NextResponse.json(newProduct)

    }catch(e){
        console.log('[Billboard Mutation]', e)
        return new NextResponse("Internal Error", {status : 500 })
    }
}


export async function DELETE( _req: Request,{params} : {params : {id : string, storeId : string}}){
    try{
        const {userId} = auth();

        if(!userId) return new NextResponse("Unauthenticated", {status: 400})
        if(!params.storeId) return new  NextResponse("Store id is required", {status:400 })

        const storeByUserid = prismadb.store.findFirst({
            where:{
                userId,
                id: params.storeId
            }
        })

        if(!storeByUserid) return new  NextResponse("Unauthorized", {status:400 })



         await prismadb.product.deleteMany({
            where :{
                id: params.id,
                storeId : params.storeId
            }
        })

        return new NextResponse("Producr Deleted", {status : 200 })

    }catch(e){
        console.log('[Product Mutation]', e)
        return new NextResponse("Internal Error", {status : 500 })
    }
}