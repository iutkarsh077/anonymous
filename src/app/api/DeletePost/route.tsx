import postDetailsModel from "@/models/PostDetails";
import dbConnect from "@/DbConnect";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const { postId } = await request.json();
  await dbConnect();
  if (!postId) {
    return NextResponse.json(
      { msg: "Post Not Found", status: false },
      { status: 401 }
    );
  }
  try {
    const deletePost = await postDetailsModel.findOneAndDelete({ _id: postId });

    return NextResponse.json(
      { msg: "Deleted Post Successfully!", status: true },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Something Went Wrong ", status: false },
      { status: 401 }
    );
  }
}
