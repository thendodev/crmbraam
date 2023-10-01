import prismadb from "@/prisma/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export const GET = (req: Request, {params}: {params : {id : string}}) => {
    try{
        if(!params.id) return new NextResponse("Size id is required",{status : 400});
        const sizes = prismadb.size.findUnique({
            where : {
                id : params.id
            }
        })
        return NextResponse.json(sizes)

    }catch(e){
        console.log('[Size_GET] : ', e)
        return new NextResponse('Internal Error', {status: 400})
    }
}


export async function PATCH( req: Request,{params} : {params : {storeId : string, id : string}}){
    try{
        const {userId} = auth();

        const  {name, value} = await req.json();


        if(!name) return new NextResponse("Size name is required", {status: 401 })
        if(!value) return new NextResponse("Size value is required", {status: 401 })
        if(!userId) return new NextResponse("unathuanticated", {status: 400})
        if(!params.storeId) return new  NextResponse("Store id is required", {status:400 })

        const size = await prismadb.size.update({
            where :{
                id: params.id,
                storeId : params.storeId
            },
            data:{
                name,
                value
            }
        })
        return NextResponse.json(size)

    }catch(e){
        console.log('[Size Mutation]', e)
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



         await prismadb.size.delete({
            where :{
                id: params.id,
                storeId : params.storeId
            }
        })

        return new NextResponse("Size Deleted", {status : 200 })

    }catch(e){
        console.log('[Size Mutation]', e)
        return new NextResponse("Internal Error", {status : 500 })
    }
}