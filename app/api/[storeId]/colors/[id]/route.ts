import prismadb from "@/prisma/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export const GET = (req: Request, {params}: {params : {id : string}}) => {
    try{
        if(!params.id) return new NextResponse("Color id is required",{status : 400});
        const color = prismadb.color.findUnique({
            where : {
                id : params.id
            }
        })
        return NextResponse.json(color)

    }catch(e){
        console.log('[Color_GET] : ', e)
        return new NextResponse('Internal Error', {status: 400})
    }
}


export async function PATCH( req: Request,{params} : {params : {storeId : string, id : string}}){
    try{
        const {userId} = auth();

        const  {name, value} = await req.json();


        if(!name) return new NextResponse("Color name is required", {status: 401 })
        if(!value) return new NextResponse("Color value is required", {status: 401 })
        if(!userId) return new NextResponse("unathuanticated", {status: 400})
        if(!params.storeId) return new  NextResponse("Store id is required", {status:400 })

        const color = await prismadb.color.update({
            where :{
                id: params.id,
                storeId : params.storeId
            },
            data:{
                name,
                value
            }
        })
        return NextResponse.json(color)

    }catch(e){
        console.log('[Color Mutation]', e)
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



         await prismadb.color.delete({
            where :{
                id: params.id,
                storeId : params.storeId
            }
        })

        return new NextResponse("Color Deleted", {status : 200 })

    }catch(e){
        console.log('[Color Mutation]', e)
        return new NextResponse("Internal Error", {status : 500 })
    }
}