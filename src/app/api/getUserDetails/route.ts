import dbConnect from "@/DbConnect";
import anonymousSignUpModel from "@/models/signupModel";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = cookies();
        const userCookie = cookieStore.get('anonymousUser')?.value;
            
        if (!userCookie) {
            return NextResponse.json({ status: false, msg: "No cookie found" }, { status: 400 });
        }
        // console.log(userCookie)
        
        const userDetails = jwt.verify(userCookie as string, process.env.JWT_SECRET_KEY!);
        
        // console.log(userDetails);
        return NextResponse.json({ status: true, userDetails }, { status: 200 });
        
    } catch (error) {
        console.error("Error during GET request:", error);
        return NextResponse.json({ status: false, msg: "Something Went Wrong190999" }, { status: 500 });
    }
}
