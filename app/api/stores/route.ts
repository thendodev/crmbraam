import prismadb from "@/prisma/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req: Request
){
    try{

        const {userId} = auth();
        const body = await req.json()
        const {name} = body

        if(!userId){
            return new NextResponse("Unauthorised", {status: 500})
        }

        if(!name){
            return new NextResponse("name is required", {status: 500})
        }

        const store = await prismadb.store.create({
            data: {
                name: name,
                userId: userId
            }
        });

        return NextResponse.json(store, {status: 200})

    }catch(e){
        console.log("[STORES_POST]", e);
        return new NextResponse("Internal error", {status: 500})
    }
}