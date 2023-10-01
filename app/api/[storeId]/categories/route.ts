import prismadb from "@/prisma/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function POST( req: Request,{params} : {params : {storeId : string}}){
    try{
        const {userId} = auth();
        const {name, billboardId} = await req.json();

        if(!name) return new NextResponse("Name is required", {status: 401 })
        if(!billboardId) return new NextResponse("Billboard id is required", {status: 401 })
        if(!userId) return new NextResponse("unathuanticated", {status: 400})
        if(!params.storeId) return new  NextResponse("Store id is required", {status:400 })

        const storeByUserid = prismadb.store.findFirst({
            where:{
                userId,
                id: params.storeId
            }
        })

        if(!storeByUserid) return new  NextResponse("Unauthorized", {status:400 })
        

        const category = await prismadb.category.create({
            data:{
                name : name,
                billboardId: billboardId,
                storeId : params.storeId
            }
        })

            return NextResponse.json(category)

    }catch(e){
        console.log('[Category Mutation]', e)
        return new NextResponse("Internal Error", {status : 500 })
    }
}




export const GET = (req: Request, {params}: {params : {storeId : string}}) => {
    try{
        if(!params.storeId) return new NextResponse("Store id is requires",{status : 400});
        const billboards = prismadb.billboard.findMany({
            where : {
                storeId : params.storeId
            }
        })
        return NextResponse.json(billboards)

    }catch(e){
        console.log('[Categories_GET] : ', e)
        return new NextResponse('Internal Error', {status: 400})
    }
}