import dbConnect from "@/DbConnect";
import { NextResponse } from "next/server";
import postDetailsModel from '@/models/PostDetails'
export const dynamic = 'force-dynamic';
export async function POST(req: Request) {
    const { userId, myUserId } = await req.json();

    // console.log(userId);
    await dbConnect();

    try {
        const IsUserAlreadyLiked = await postDetailsModel.findOne({ _id: userId, LikedUser: { $elemMatch: { userId: myUserId } } });
        // console.log("The value id: ", IsUserAlreadyLiked);

        if (IsUserAlreadyLiked != null) {
            console.log("In If block")
            IsUserAlreadyLiked.likes = IsUserAlreadyLiked.likes - 1;

            // Optionally, remove the user from the LikedUser array
            IsUserAlreadyLiked.LikedUser = IsUserAlreadyLiked.LikedUser.filter((user: any) => user.userId !== myUserId);
            // Save the updated post
            await IsUserAlreadyLiked.save();


            return NextResponse.json({ status: true, msg: "Post Unliked Successfully" }, { status: 201 });
        }

        else {
            // console.log("In else block")
            const LikeThePost = await postDetailsModel.findOne({ _id: userId })
            // User has not liked the post, so like it
            LikeThePost.likes = LikeThePost.likes + 1;

            // Add the user to the LikedUser array
            // LikeThePost.updateOne({
            //     $push: {
            //         LikedUser: myUserId,
            //     }
            // });

            LikeThePost.LikedUser.push({ userId: myUserId, createdAt: new Date() });

            // Save the updated post
            await LikeThePost.save();
            // console.log(LikeThePost)
            return NextResponse.json({ status: true, msg: "Post liked successfully" }, { status: 200 });
        }

    } catch (error) {
        // console.log(error)
        return NextResponse.json({ status: false, msg: "Something went Wrong" }, { status: 401 })
    }

}