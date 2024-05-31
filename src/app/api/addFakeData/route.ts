import { NextResponse } from 'next/server';
// import bcryptjs from 'bcryptjs';
// import anonymousSignUpModel from '@/models/signupModel';
import postData from "@/postData.json";
import postDetailsModel from '@/models/PostDetails';
import dbConnect from '@/DbConnect';
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
    try {
        dbConnect();
        /*let data2: any[] = [];
        for (const user of data) {
            const salting = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(user.password, salting);
            user.password = hashedPassword;
            data2 = [...data2, user];
        }
        console.log(data2);

        for(const user of data2){
            const newUser = await anonymousSignUpModel.create({
                email: user.email,
                username: user.username,
                password: user.password
            })
        }  */


        for (const post of postData) {
            const newPost = await postDetailsModel.create({
                username: post.username,
                image: post.image,
                description: post.description,
                likes: post.likes
            })
        }
        return NextResponse.json({ status: true, data: "Done User post set" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: false, message: 'Something went wrong' }, { status: 500 })
    }
}