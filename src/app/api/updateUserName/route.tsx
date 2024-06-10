import dbConnect from "@/DbConnect";
import anonymousSignUpModel from "@/models/signupModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username } = await request.json();
  const cookieStore = cookies();
  const userCookie = cookieStore.get("anonymousUser")?.value;

  if (!userCookie) {
    return NextResponse.json(
      { status: false, msg: "No cookie found" },
      { status: 400 }
    );
  }
  // console.log(userCookie)

  const userDetails = jwt.verify(
    userCookie as string,
    process.env.JWT_SECRET_KEY!
  );

  if (!username) {
    return new Response(JSON.stringify({ error: "Fields are required" }), {
      status: 400,
    });
  }

  await dbConnect();
  const id = (userDetails as any).id;

  try {
    const findById = await anonymousSignUpModel.findById({ _id: id });

    findById.username = username;

    await findById.save();

    let token = jwt.sign(
      { id: findById._id, username: findById.username },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: "15d" }
    );

    const hey = cookies().set("anonymousUser", token, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });

    return new Response(JSON.stringify({ success: "User created" }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
    });
  }
}
