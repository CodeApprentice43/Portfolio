import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export const PUT = async(request,{params}) => {
    try {
        const id = params.id;
        const updatedProjectData = await request.json();
        const updatedProject = await prisma.project.update({
            where: { id: id },
            data: updatedProjectData,
        });

        return NextResponse.json(updatedProject, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export const DELETE = async(request, {params}) => {
    try {
        const id = params.id;
        await prisma.project.delete({
            where: { id: id },
        });
        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }   
}