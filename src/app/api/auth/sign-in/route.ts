import dbConnect from "@/DbConnect";
import anonymousSignUpModel from "@/models/signupModel";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'


export async function POST(req: Request){
    const { username, password } = await req.json();
    if (!username || !password) {
        return new Response(JSON.stringify({ error: "Fields are required" }), { status: 400 });
    }

    await dbConnect();

    try{
        const cookieStore = cookies();
        const findUser = await anonymousSignUpModel.findOne({ username });
        if (!findUser) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }
        const isMatch = await bcrypt.compare(password, findUser.password);

        if (!isMatch) {
            return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 400 });
        }

        let token = jwt.sign({ id: findUser._id, username }, process.env.JWT_SECRET_KEY!, {expiresIn: '15d'});

        const hey = cookies().set('anonymousUser', token, {httpOnly: true, sameSite: 'lax', expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)});

        return new Response(JSON.stringify({ success: "User logged in" }), { status: 200 });

    }catch{
        return new Response(JSON.stringify({ error: "An error occurred" }), { status: 500 });
    }
}