import dbConnect from "@/DbConnect";
import anonymousSignUpModel from "@/models/signupModel";
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    const {username, email, password } = await request.json();

    if (!username || !email || !password) {
        return new Response(JSON.stringify({ error: "Fields are required" }), { status: 400 });
    }

    await dbConnect();

    try {
        const findEmail = await anonymousSignUpModel.findOne({ email });

        if (findEmail) {
            return new Response(JSON.stringify({ error: "Email already exists" }), { status: 400 });
        }

        const salting = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salting);

        const newuser = await anonymousSignUpModel.create({
            email,
            password: hashedPassword,
            username: username
        })

        return new Response(JSON.stringify({ success: "User created" }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "An error occurred" }), { status: 500 });
    }
}