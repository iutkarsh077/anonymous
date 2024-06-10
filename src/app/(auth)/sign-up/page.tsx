"use client";
import Image from "next/image";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { signUpSchema } from "@/schemas/signUpSchema";
import { useDebounceCallback } from "usehooks-ts";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import OtpVerify from "@/components/CustomComponents/Otp";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const debouncedUserName = useDebounceCallback(setUsername, 500);
  const [userNameMessage, setUsernameMessage] = useState<String>("");
  const [checkingUsername, setcheckingUsername] = useState<boolean>(false);
  const [isSignupButtonClicked, setIsSignupButtonClicked] =
    useState<boolean>(false);
  const [RenderOtpComponent, setRenderOtpComponent] = useState<boolean>(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  console.log(username);

  useEffect(() => {
    const checkingUsernameUnique = async () => {
      if (username) {
        try {
          setcheckingUsername(true);
          const res = await axios.get(
            `/api/checking-username-unique?username=${username}`
          );
          console.log(res);
          setUsernameMessage(res.data.message);
        } catch (error: any) {
          console.log(error);
          setUsernameMessage("Error while checking username");
        } finally {
          setcheckingUsername(false);
        }
      }
    };
    checkingUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      setIsSignupButtonClicked(true);
      setRenderOtpComponent(true);
    } catch (error) {
      console.log("Errror");
      console.error(error);
    } finally {
      setIsSignupButtonClicked(false);
    }
  };

  if (RenderOtpComponent) {
    const userData = form.getValues();
    return <OtpVerify userData={userData} />;
  }

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-b from-black to-gray-500 flex justify-center items-center">
        <div className="w-3/4 h-3/4 flex">
          <div className="hidden md:flex md:w-1/2">
            <Image
              src="/images/signup.png"
              alt="sign-up"
              width={250}
              height={250}
              className="w-full object-cover"
              quality={100}
            />
          </div>
          <div className="bg-gray-700 w-full md:w-1/2 flex justify-center items-center">
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg ">Username</FormLabel>
                        <Input
                          {...field}
                          name="Username"
                          onChange={(e) => {
                            field.onChange(e);
                            debouncedUserName(e.target.value);
                          }}
                        />
                        <p className="flex gap-x-2">
                          {checkingUsername && (
                            <Loader2 className="animate-spin" />
                          )}
                          {userNameMessage && (
                            <p
                              className={`text-sm ${
                                userNameMessage === "Username is available"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {userNameMessage}
                            </p>
                          )}
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg ">Email</FormLabel>
                        <Input {...field} name="email" />
                        <p className="text-muted text-gray-400 text-sm">
                          We will send you a verification code
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg ">Password</FormLabel>
                        <Input type="password" {...field} name="password" />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isSignupButtonClicked}>
                    {isSignupButtonClicked ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
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

export default SignUp;
