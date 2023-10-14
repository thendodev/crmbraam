import prismadb from "@/prisma/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function POST( req: Request,{params} : {params : {storeId : string}}){
    try{
        const {userId} = auth();
        const {name, image, price, categoryId, sizeId, colorId, isFeatured, isArchived} = await req.json();

        if(!name) return new NextResponse("name is required", {status: 401 })
        if(!image) return new NextResponse("image  is required", {status: 401 })
        if(!price) return new NextResponse("price  is required", {status: 401 })
        if(!categoryId) return new NextResponse("category id  is required", {status: 401 })
        if(!sizeId) return new NextResponse("size id  is required", {status: 401 })
        if(!colorId) return new NextResponse("color id  is required", {status: 401 })
        if(isFeatured === undefined || null) return new NextResponse("featured property  is required", {status: 401 })
        if(isArchived === undefined || null) return new NextResponse("archived property is required", {status: 401 })
        if(!userId) return new NextResponse("unathuanticated", {status: 400})
        if(!params.storeId) return new  NextResponse("Store id is required", {status:400 })


        const storeByUserid = prismadb.store.findFirst({
            where:{
                userId,
                id: params.storeId
            }
        })

        if(!storeByUserid) return new  NextResponse("Unauthorized", {status:400 })
        

        const product = await prismadb.product.create({
            data:{
                name,
                image : {
                    createMany : {
                        data : [...image.map((image : {url : string })=> image)]
                    }
                },
                price,
                categoryId,
                sizeId,
                colorId,
                isFeatured,
                isArchived,
                storeId: params.storeId
            }
        })

            return NextResponse.json(product)

    }catch(e){
        console.log('[Product Mutation]', e)
        return new NextResponse("Internal Error", {status : 500 })
    }
}




export const GET = (req: Request, {params}: {params : {storeId : string}}) => {
    try{
        if(!params.storeId) return new NextResponse("Store id is requires",{status : 400});
      
        const {searchParams} = new URL(req.url);

        
        const categoryId = searchParams.get("categoryId") || undefined;
        const colorId = searchParams.get("categoryId") || undefined;
        const sizeId = searchParams.get("categoryId") || undefined;
        const isFeatured = searchParams.get("categoryId") || undefined;
       
        const products = prismadb.product.findMany({
            where : {
                categoryId,
                colorId,
                sizeId,
                isFeatured : isFeatured ? true : undefined,
                isArchived: false
            },
            include : {
                image : true,
                category : true,
                color : true,
                size : true
            },
            orderBy : {
                createdAt : "desc"
            }
        })
        return NextResponse.json(products)

    }catch(e){
        console.log('[Product_GET] : ', e)
        return new NextResponse('Internal Error', {status: 400})
    }
}