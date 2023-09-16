import prismadb from "@/prisma/prismadb";
import { SignIn } from "@clerk/nextjs";


export default function  Page() {


  return <SignIn redirectUrl={"/"} />;

}