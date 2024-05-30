import dbConnect from "@/DbConnect";
import anonymousSignUpModel from "@/models/signupModel";
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { email, password } = await req.json();

    dbConnect();

    try {
        // console.log(email, password);
        const user = await anonymousSignUpModel.findOne({ email });

        if (!user) {
            return NextResponse.json({ status: false, msg: "User not found!" }, { status: 404 })
        }
        // console.log(user)
        const salting = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salting);

        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({ status: true, msg: "Password changed successfully!" }, { status: 201 });
    } catch (error) {
        // console.log(error);
        return NextResponse.json({ status: false, msg: "Change Password gone wrong!" })
    }
}