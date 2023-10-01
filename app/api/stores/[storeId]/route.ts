import prismadb from "@/prisma/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function PATCH( req: Request,{params} : {params : {storeId : string}}){
    try{
        const {userId} = auth();
        const body = await req.json();

        const {name} = body;
        if(!name) return new NextResponse("Name is required", {status: 401 })
        if(!userId) return new NextResponse("Unauthorized", {status: 400})
        if(!params.storeId) return new  NextResponse("Store id is required", {status:400 })

        const store = await prismadb.store.updateMany({
            where :{
                id: params.storeId,
                userId
            },
            data:{
                name: name,
            }
        })
        return NextResponse.json(store)

    }catch(e){
        console.log('[Store Mutation]', e)
        return new NextResponse("Internal Error", {status : 500 })
    }
}



export async function DELETE( _req: Request,{params} : {params : {storeId : string}}){
    try{
        const {userId} = auth();

        if(!userId) return new NextResponse("Unauthorized", {status: 400})
        if(!params.storeId) return new  NextResponse("Store id is required", {status:400 })

        await prismadb.store.deleteMany({
            where :{
                id: params.storeId,
                userId
            }
        })
        }catch(e){
        console.log('[Store Mutation]', e)
        return new NextResponse("Internal Error", {status : 500 })
    }
}