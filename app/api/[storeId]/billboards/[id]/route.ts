import prismadb from "@/prisma/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export const GET = (req: Request, {params}: {params : {id : string}}) => {
    try{
        if(!params.id) return new NextResponse("Billboard id is required",{status : 400});
        const billboards = prismadb.billboard.findUnique({
            where : {
                id : params.id
            }
        })
        return NextResponse.json(billboards)

    }catch(e){
        console.log('[Billboard_GET] : ', e)
        return new NextResponse('Internal Error', {status: 400})
    }
}


export async function PATCH( req: Request,{params} : {params : {storeId : string, id : string}}){
    try{
        const {userId} = auth();

        const  {label, imageUrl} = await req.json();


        if(!label) return new NextResponse("Label is required", {status: 401 })
        if(!imageUrl) return new NextResponse("Image URL is required", {status: 401 })
        if(!userId) return new NextResponse("unathuanticated", {status: 400})
        if(!params.storeId) return new  NextResponse("Store id is required", {status:400 })

        const store = await prismadb.billboard.updateMany({
            where :{
                id: params.id,
                storeId : params.storeId
            },
            data:{
                label: label,
                imageUrl: imageUrl
            }
        })
        return NextResponse.json(store, {status : 200})

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



         await prismadb.billboard.deleteMany({
            where :{
                id: params.id,
                storeId : params.storeId
            }
        })

        return new NextResponse("Billboard Deleted", {status : 200 })

    }catch(e){
        console.log('[Billbaord Mutation]', e)
        return new NextResponse("Internal Error", {status : 500 })
    }
}