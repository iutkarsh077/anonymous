"use client";
import React, { cache, useContext, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { UserPostType } from "@/types/PostData";
import { Button } from "../ui/button";
import { UserContext } from "@/context/GlobalContextProvider";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import GetUserPosts from "@/lib/GetUserPosts";
import { User } from "@/types/PostData";

export const dynamic = "force-dynamic";

const MyHome = () => {
  const { toast } = useToast();
  const userDetails = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<UserPostType[]>();
  const [errorOccured, setErrorOccured] = useState(true);
  const [dataTrue, setDataTrue] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const response = await fetch("/api/UserNewPost", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setPosts(data.posts);
    try {
      setLoading(true);
      setLoading(false);
      setErrorOccured(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
      setErrorOccured(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col h-screen fixed left-[500px] mt-20 space-y-3">
        <Skeleton className="h-1/2 w-[475px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );

  if (errorOccured) {
    return (
      <div className="flex flex-col h-screen fixed left-[700px] top-80 space-y-3">
        <Button className="flex gap-x-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          Try Again
        </Button>
      </div>
    );
  }

  const handleCountIncrease = async (userId: string) => {
    try {
      const MyId = {
        userId: userId,
        myUserId: userDetails.id,
      };

      const res = await fetch("/api/LikeThePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(MyId),
      });
      fetchPosts();
    } catch (error) {
      setErrorOccured(true);
      // Handle network or other errors
      console.error("Error liking the post:", error);
    }
  };
  console.log("Hii");

  const baseUrl = `${window.location.protocol}//${window.location.host}`;

  const handleSharePost = async (postId: string) => {
    const profileUrl = `${baseUrl}/share/${postId}`;
    navigator.clipboard.writeText(profileUrl);
    console.log(profileUrl);
    toast({
      title: "URL Copied!",
      description: "Profile URL has been copied to clipboard.",
    });
  };

  return (
    <div className="overflow-x-hidden flex  justify-center mt-2 h-screen ">
      <div className="border-2 max-w-[475px] border-black border-opacity-20 rounded-xl hide-scrollbar overflow-y-scroll">
        <div className="grid grid-cols-1 gap-4 p-4">
          {posts?.map((post: UserPostType) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <p className="flex justify-between items-center p-4">
                <span className="flex gap-x-2">
                  <img
                    src={post.image}
                    alt={`${post.username}'s profile`}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="text-lg font-semibold">{post.username}</span>
                </span>
                <Button
                  className="mb-4"
                  onClick={() => {
                    handleSharePost(post._id);
                  }}
                >
                  Share
                </Button>
              </p>
              <img
                src={post.image}
                alt="Post image"
                className="w-full h-auto object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <button
                    onClick={() => {
                      handleCountIncrease(post._id);
                    }}
                    className="text-blue-500"
                  >
                    <p className="flex gap-x-2 items-center">
                      {post.LikedUser.some(
                        (user) => user.userId == userDetails.id
                      ) ? (
                        <span className="flex gap-x-3 items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            fill="currentColor"
                            className="size-8"
                          >
                            <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                          </svg>
                          <span>{post.likes}</span>
                        </span>
                      ) : (
                        <span className="flex gap-x-3 items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-8"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                            />
                          </svg>
                          <span>{post.likes}</span>
                        </span>
                      )}
                    </p>
                  </button>
                </div>
                <div className="text-gray-700">{post.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyHome;
