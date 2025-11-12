import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export const GET = async(request, {params}) => {
    try {
        const id = params.id;
        const review = await prisma.review.findUnique({
            where: { id: id },
        });

        if (!review) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        return NextResponse.json(review, { status: 200 });
    } catch (error) {
        console.error("Review fetch error:", error)
        return NextResponse.json({ error: "Failed to fetch review", details: error.message }, { status: 500 });
    }
}

export const PUT = async(request,{params}) => {
    try {
        const id = params.id;
        const updatedReviewData = await request.json(); 
        const updatedReview = await prisma.review.update({
            where: { id: id },
            data: updatedReviewData,
        }); 
        return NextResponse.json(updatedReview, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
    }
}

export const DELETE = async(request, {params}) => {
    try {
        const id = params.id;             
        await prisma.review.delete({
            where: { id: id },
        });
        return NextResponse.json({ message: "Review deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
    }   
}