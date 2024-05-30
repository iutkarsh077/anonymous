import dbConnect from '@/DbConnect';
import postDetailsModel from '@/models/PostDetails';
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();
    try {
        const posts: any[] = (await postDetailsModel.find()).sort((a: any, b: any) => b.createdAt - a.createdAt);
        console.log(posts);
        return NextResponse.json({ status: true, posts }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false, msg: "Something went Wrong Try Again" }, { status: 401 })
    }
}