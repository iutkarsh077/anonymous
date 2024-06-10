export const dynamic = "force-dynamic";
import dbConnect from "@/DbConnect";
import postDetailsModel from "@/models/PostDetails";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  await dbConnect();
  const { username } = await request.json();
  if (!username) {
    return NextResponse.json(
      { msg: "Username is Required", status: false },
      { status: 401 }
    );
  }
  try {
    const findMyPosts = await postDetailsModel.find({ username: username }).sort({ createdAt: -1 });

    return NextResponse.json({msg: "All Posts Fetched", findMyPosts, status: true}, {status: 201})
  } catch (error) {
    return NextResponse.json(
      { msg: "Something Went Wrong", status: false },
      { status: 501 }
    );
  }
}
