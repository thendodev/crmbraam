import { toast } from "@/components/ui/use-toast";
import prismadb from "@/prisma/prismadb";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

export default async function SetupLayout({
    children
}:{
    children: React.ReactNode
}){

    const {userId} = auth();

    if(!userId) redirect("/sign-in")

    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    }).catch(()=>{
    })

    if(store) redirect(`/${store.id}`)

    return (
        <>{children}</>
    )
}