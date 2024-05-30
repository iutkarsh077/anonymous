import { uploadImageCloudinary } from "@/lib/cloudinaryImageUpload";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import anonymousSignUpModel from "@/models/signupModel";
import postDetailsModel from '@/models/PostDetails';

import { CloudinaryUploadResult } from '@/lib/cloudinaryImageUpload';
export async function POST(req: Request) {
    const formData = await req.formData();
    const cookieStore = cookies();
    const image = formData.get("file") as File;
    const text = formData.get("text") as string;

    const userCookie = cookieStore.get("anonymousUser")?.value;
    try {
        const CloudinaryImageLink = await uploadImageCloudinary(image, "posts") as CloudinaryUploadResult;

        const decoded = jwt.verify(userCookie as string, process.env.JWT_SECRET_KEY!) as { id: string };

        const userDetails = await anonymousSignUpModel.findById(decoded.id);

        if (!userDetails) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const createPost = await postDetailsModel.create({
            username: userDetails?.username,
            image: CloudinaryImageLink.secure_url,
            description: text,
            likes: 0
        })

        // console.log(createPost);

        return NextResponse.json({ message: "Post uploaded successfully!" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}