import dbConnect from '@/DbConnect';
import postDetailsModel from '@/models/PostDetails';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
    await dbConnect();
    try {
        const posts = await postDetailsModel.find().sort({ createdAt: -1 });
        console.log(posts);
        console.log("IN UserNewPOst route");
        return NextResponse.json({ status: true, posts }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false, msg: "Something went Wrong Try Again" }, { status: 401 })
    }
}