import prismadb from "@/prisma/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function POST( req: Request,{params} : {params : {storeId : string}}){
    try{
        const {userId} = auth();
        const {label, imageUrl} = await req.json();

        if(!label) return new NextResponse("Label is required", {status: 401 })
        if(!imageUrl) return new NextResponse("Image URL is required", {status: 401 })
        if(!userId) return new NextResponse("unathuanticated", {status: 400})
        if(!params.storeId) return new  NextResponse("Store id is required", {status:400 })

        const storeByUserid = prismadb.store.findFirst({
            where:{
                userId,
                id: params.storeId
            }
        })

        if(!storeByUserid) return new  NextResponse("Unauthorized", {status:400 })
        

        const billboard = await prismadb.billboard.create({
            data:{
                label,
                imageUrl,
                storeId: params.storeId
            }
        })

            return NextResponse.json(billboard, {status: 200})

    }catch(e){
        console.log('[Billboard Mutation]', e)
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
        console.log('[Billboard_GET] : ', e)
        return new NextResponse('Internal Error', {status: 400})
    }
}