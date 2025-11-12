import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";



export const GET = async()=>{
    try {
        const projects = await prisma.project.findMany();
        return NextResponse.json(projects, {status: 200});
    }catch(error){
        return NextResponse.json({error: "Failed to fetch projects"}, {status: 500});
    }
}
export const POST = async(request)=> {
    try {
        const newProject = await request.json();
        const createdProject = await prisma.project.create({
            data: newProject,
        });
        return NextResponse.json(createdProject, {status: 201});
    }catch(error){
        return NextResponse.json({error: "Failed to create project"}, {status: 500});
    }
}
