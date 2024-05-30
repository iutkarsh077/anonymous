import dbConnect from "@/DbConnect";
import postDetailsModel from "@/models/PostDetails";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
    const  { userId } = await request.json();

    dbConnect();
    try {
        if (!userId) {
            return NextResponse.json({ status: false, message: "User Id is required" }, { status: 400 });
        }

        const post = await postDetailsModel.findOne({_id:  userId})
        if (!post) {
            return NextResponse.json({ status: false, message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ status: true, message: "Post found", post }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: false, message: "Error Occured" }, { status: 500 });
    }
}