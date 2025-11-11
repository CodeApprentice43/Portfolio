import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async()=>{
    try {
        const projects = await prisma.project.findMany();
        return NextResponse.json(projects, {status: 200});
    }catch(error){
        return NextResponse.json({error: "Failed to fetch projects"}, {status: 500});
    }
}