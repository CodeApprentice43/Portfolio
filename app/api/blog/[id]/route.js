import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export const PUT = async(request,{params}) => {
    try {
        const id = params.id;
        const updatedBlogData = await request.json();
        const updatedBlog = await prisma.blog.update({
            where: { id: id },
            data: updatedBlogData,
        });

        return NextResponse.json(updatedBlog, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }
}

export const DELETE = async(request, {params}) => {
    try {
        const id = params.id;
        await prisma.blog.delete({
            where: { id: id },
        });
        return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
    }   
}