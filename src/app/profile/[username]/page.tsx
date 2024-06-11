"use client";
import React, { useContext } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/CustomComponents/Navbar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDebounceCallback } from "usehooks-ts";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UserContext } from "@/context/GlobalContextProvider";
import ShowMyPosts from "@/components/mypages/ShowMyPosts";

const Profile = () => {
  const params = useParams<{ username: string }>();
  const userDetails = useContext(UserContext);
  const [username, setUsername] = useState(params.username);
  const debouncedUserName = useDebounceCallback(setUsername, 500);
  const [userNameMessage, setUsernameMessage] = useState<String>("");
  const [checkingUsername, setcheckingUsername] = useState<boolean>(false);
  const [Myposts, setMyPosts] = useState<any>();
  const { toast } = useToast();
  const [isSignupButtonClicked, setIsSignupButtonClicked] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        // console.log(params.username)
        const res = await axios.post("/api/getMyPosts", {
          username: params.username,
        });
        setMyPosts(res.data.findMyPosts);
      } catch (error) {
        console.log("Error Occured");
      }
    };
    fetchMyPosts();
  }, []);

  useEffect(() => {
    if (username == "" || username === params.username) {
      return setUsernameMessage("Update Username Here");
    }
    const checkingUsernameUnique = async () => {
      if (username) {
        try {
          setcheckingUsername(true);
          const res = await axios.get(
            `/api/checking-username-unique?username=${username}`
          );
          // console.log(res);
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

  // console.log(Myposts);

  const onSubmit = async () => {
    try {
      // console.log(username);
      const res = await axios.post("/api/updateUserName", {
        username,
      });
      toast({
        title: "About Username",
        description: "Username Updated Successfully!",
      });
      console.log(res);
      setIsSignupButtonClicked(true);
    } catch (error) {
      console.log("Errror");
      // console.error(error);
    } finally {
      setIsSignupButtonClicked(false);
    }
  };

  // console.log(Myposts);
  return (
    <>
      <Navbar />
      <div className="border-2 min-h-96 lg:flex justify-around mt-20 border-black rounded-xl shadow-2xl lg:ml-48 lg:mr-48 ml-10 mr-10">
        <div className="lg:w-1/2 min-h-48 pt-4 lg:pt-0 lg:min-h-96 flex flex-col  lg:justify-center gap-y-3 items-center">
          <img
            src={"/images/signup.png"}
            width={300}
            height={250}
            className="rounded-full w-[150px] h-[150px] lg:w-[300px] lg:h-[300px]"
            alt="Profile Image"
          />
        </div>
        <div className="flex items-center pt-10 lg:pt-0  justify-center pb-5">
          <div className="space-y-4">
            <label htmlFor="Username">Username</label>
            <Input
              type="text"
              placeholder="Username"
              className="border border-gray-300 focus:outline-none"
              value={params.username}
              readOnly
              // onChange={(e) => debouncedUserName(e.target.value)}
            />
            {/* <p className="flex gap-x-2">
              {checkingUsername && <Loader2 className="animate-spin" />}
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
            </p> */}

            {/* <Button onClick={onSubmit} disabled={isSignupButtonClicked}>
              {isSignupButtonClicked ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign Up"
              )}
            </Button> */}
          </div>
        </div>
      </div>
      <ShowMyPosts Myposts={Myposts}/>
    </>
  );
};

export default Profile;
