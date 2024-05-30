"use client";
import Image from "next/image";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OtpVerifyForgotPassword from "@/components/CustomComponents/OtpVerifyForgotPassword";

const EmailVerify = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),
});

const SignIn = () => {
  const router = useRouter();
  const [isSignInButtonClicked, setisSignInButtonClicked] =
    useState<boolean>(false);
    const [RenderOtp, setRenderOtp] = useState<boolean>(false);
  const form = useForm<z.infer<typeof EmailVerify>>({
    resolver: zodResolver(EmailVerify),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof EmailVerify>) => {
    try {
      setisSignInButtonClicked(true);
      setRenderOtp(true);
    } catch (error) {
      console.error(error);
    } finally {
      setisSignInButtonClicked(false);
    }
  };
if(RenderOtp){
  const userData = form.getValues();
  return <OtpVerifyForgotPassword userData={userData} />;
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
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg ">Email</FormLabel>
                        <Input {...field} name="email" />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isSignInButtonClicked}>
                    {isSignInButtonClicked ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "GET OTP"
                    )}
                  </Button>
                </form>
              </Form>
              <div className="text-center mt-4">
                <p className="text-lg">
                  Dont have Account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    Sign Up
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

export default SignIn;
