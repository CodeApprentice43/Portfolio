import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export const GET = async ()=> {
    try{
        const reviews = await prisma.review.findMany(); //return promise <pending>
        return NextResponse.json(reviews, {status: 200}); //resolve promise
    }catch(error){
        return NextResponse.json("Failed to fetch reviews", {status: 500}); //if error occurs 
    }
}
export const POST = async (request) => {
    try{
        const newReview = await request.json()
        const createdReview = await prisma.review.create({
            data: newReview
    });
    return NextResponse.json(createdReview,{status:201});
    }catch(error){
        console.error("Review creation error:", error)
        return NextResponse.json({error:"Failed to create new review", details: error.message},{status:500})
    }
}


