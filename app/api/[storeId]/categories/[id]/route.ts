import prismadb from "@/prisma/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export const GET = (req: Request, {params}: {params : {id : string}}) => {
    try{
        if(!params.id) return new NextResponse("Category id is required",{status : 400});
        const category = prismadb.category.findUnique({
            where : {
                id : params.id
            }
        })
        return NextResponse.json(category)

    }catch(e){
        console.log('[Category_GET] : ', e)
        return new NextResponse('Internal Error', {status: 400})
    }
}


export async function PATCH( req: Request,{params} : {params : {storeId : string, id : string}}){
    try{
        const {userId} = auth();

        const {name, billboardId} = await req.json();

        if(!name) return new NextResponse("Name is required", {status: 401 })
        if(!billboardId) return new NextResponse("Category id is required", {status: 401 })
        if(!userId) return new NextResponse("unathuanticated", {status: 400})
        if(!params.storeId) return new  NextResponse("Store id is required", {status:400 })

        const store = await prismadb.category.updateMany({
            where :{
                id: params.id,
                storeId : params.storeId
            },
            data:{
                name,
                billboardId
            }
        })
        return NextResponse.json(store)

    }catch(e){
        console.log('[Category Mutation]', e)
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



         await prismadb.billboard.delete({
            where :{
                id: params.id,
                storeId : params.storeId
            }
        })

        return new NextResponse("Category Deleted", {status : 500 })

    }catch(e){
        console.log('[Category Mutation]', e)
        return new NextResponse("Internal Error", {status : 500 })
    }
}