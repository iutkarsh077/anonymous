"use client";
import Image from "next/image";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { otpSchema } from "@/schemas/OtpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmPassword from "./ConfirmPassword";
import Sendit from "@/lib/SendIt";

interface UserData {
  email: string;
}

interface OtpVerifyProps {
  userData: UserData;
}

const OtpVerifyForgotPassword: React.FC<OtpVerifyProps> = ({ userData }) => {
  console.log(userData);
  const [otpCheck, setOTPCheck] = useState("");
  const [sendOtp, setSendOtp] = useState(true);
  const [RenderPassword, setRenderPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    const sendingOtp = () => {
      // console.log("In sending otp function");
      const otp = Math.floor(Math.random() * 1000000);
      setOTPCheck(otp.toString());
      Sendit({
        to: userData.email,
        name: "My user",
        subject: "OTP Verification",
        body: `Your OTP is ${otp}`,
      });
    };
    sendingOtp();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      if (data.otp != otpCheck) {
        console.log("OTP Invalid");
        return;
      }
      setRenderPassword(true);
    } catch (error) {
      console.log("Error in verifying OTP", error);
    }
  };

  if(RenderPassword){
    return <ConfirmPassword userEmail={ userData.email }/>
  }

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-b from-black to-gray-500 flex justify-center items-center">
        <div className="w-3/4 h-3/4 flex">
          <div className="flex w-1/2">
            <Image
              src="/images/signup.png"
              alt="sign-up"
              width={250}
              height={250}
              className="w-full object-cover"
              quality={100}
            />
          </div>
          <div className="bg-gray-700 w-1/2 flex justify-center items-center">
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    name="otp"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg ">OTP</FormLabel>
                        <Input {...field} name="otp" />
                        <p className="text-muted text-gray-400 text-sm">
                          Enter the Verication Code
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Verify OTP</Button>
                </form>
              </Form>
              <div className="text-center mt-4">
                <p className="text-lg">
                  Already a member?{" "}
                  <Link
                    href="/sign-in"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpVerifyForgotPassword;
