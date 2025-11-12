import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";


export const GET = async ()=> {
try{
    const blogPosts = await prisma.blog.findMany();
    return NextResponse.json(blogPosts, {status: 200});
}catch(error){
      return NextResponse.json("Failed to fetch blogs", {status: 500});
}
}
export const POST = async (request) => {
    try{
        const newBlog = await request.json()
        const createdBlog = await prisma.blog.create({
            data: newBlog
    });
    return NextResponse.json(createdBlog,{status:201});
    }catch(error){
        console.error("Blog creation error:", error)
        return NextResponse.json({error:"Failed to create new blog", details: error.message},{status:500})
    }
}