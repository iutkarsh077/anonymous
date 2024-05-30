"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { UserPostType } from "@/types/PostData";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/CustomComponents/Navbar";
import Image from "next/image";

const SharedPost = ({ params }: { params: { post: string } }) => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [errorOccurred, setErrorOccurred] = useState(false);

  const tryAgainToFetchPost = async () => {
    try {
      setLoading(true);
      setErrorOccurred(false);
      // console.log(typeof params.post);
      const res = await fetch(`${window.location.origin}/api/sharedPost`, {
        method: "POST",
        body: JSON.stringify({ userId: params.post }),
      });

      const data = await res.json();
      setPosts(data.post);
      // console.log(data.post);
    } catch (error) {
      // console.log(error);
      setErrorOccurred(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    tryAgainToFetchPost();
  }, [params.post]);

  if (loading) {
    return (
      <div className="flex flex-col h-screen fixed left-[500px] mt-20 space-y-3">
        <Skeleton className="h-1/2 w-[475px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (errorOccurred) {
    return (
      <div className="flex flex-col h-screen fixed left-[700px] top-80 space-y-3">
        <p>An error occurred while fetching the post.</p>
        <Button onClick={tryAgainToFetchPost} className="flex gap-x-5">
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

  if (!posts) {
    return null; // or render a loading spinner
  }

  return (
    <div className="overflow-hidden">
    <Navbar/>
    <div className="w-screen h-screen overflow-hidden flex pt-5 justify-center">
        <div className="max-w-lg h-fit  rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={posts.image} alt={posts.username} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{posts.username}</div>
        <p className="text-gray-700 text-base">{posts.description}</p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Likes: {posts.likes}
        </span>
        <div className="mt-4">
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default SharedPost;
