import prismadb from "@/prisma/prismadb";
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export async function POST( req: Request,{params} : {params : {storeId : string}}){
    try{
        const {userId} = auth();
        const {name, value} = await req.json();

        if(!name) return new NextResponse("Color name is required", {status: 401 })
        if(!value) return new NextResponse("Color value is required", {status: 401 })
        if(!userId) return new NextResponse("unathuanticated", {status: 400})
        if(!params.storeId) return new  NextResponse("Store id is required", {status:400 })


        const storeByUserid = prismadb.store.findFirst({
            where:{
                userId,
                id: params.storeId
            }
        })

        if(!storeByUserid) return new NextResponse("Unauthorized", {status:400 })
        

        const color = await prismadb.color.create({
            data:{
                name,
                value,
                storeId: params.storeId
            }
        })

            return NextResponse.json(color)

    }catch(e){
        console.log('[Colors Mutation]', e)
        return new NextResponse("Internal Error", {status : 500 })
    }
}




export const GET = (req: Request, {params}: {params : {storeId : string}}) => {
    try{
        if(!params.storeId) return new NextResponse("Store id is requires",{status : 400});
        const colors = prismadb.color.findMany({
            where : {
                storeId : params.storeId
            }
        })
        return NextResponse.json(colors)

    }catch(e){
        console.log('[Colors_GET] : ', e)
        return new NextResponse('Internal Error', {status: 400})
    }
}