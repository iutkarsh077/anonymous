import dbConnect from "@/DbConnect";
import { NextResponse } from "next/server";
import anonymousSignUpModel from "@/models/signupModel";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
const UsernameQuerySchema = ({username: usernameValidation})

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const queryParams = {
        username: searchParams.get("username")
    }
    dbConnect();
   try {
    const result = UsernameQuerySchema.username.safeParse(queryParams.username).data;
    // console.log(result);

    const findUsernameUnique = await anonymousSignUpModel.findOne({username: result});

    if(findUsernameUnique){
        return NextResponse.json({ status: true, message: "Username is not availbale" }, {status: 201});
    }

    return NextResponse.json({ status: true, message: "Username is available" }, {status: 201});
   } catch (error) {
    // console.log(error);
    return NextResponse.json({ status: false, message: "Something went wrong" }, {status: 501});
   }
}