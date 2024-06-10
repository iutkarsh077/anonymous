"use client";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { UserPostType } from "@/types/PostData";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useRouter } from "next/navigation";

const ShowMyPosts = ({ Myposts }: { Myposts: any[] }) => {
  const { toast } = useToast();
  const router = useRouter();
  if (!Myposts) {
    return <Skeleton />;
  }

  const handleDeletePost = async (postId: string) => {
    try {
      const res = await axios.post("/api/DeletePost", {
        postId: postId,
      });
      console.log(res);
      toast({
        title: res.data.msg || "Post Deleted Successfully",
        description: "You data is Deleted Permenantly",
      });
      router.push("/");
    } catch (error) {
      console.log("Error Occured");
      toast({
        title: "Failed Post Deletion",
        description: "Please Try Again, After Sometime!",
      });
    }
  };

  return (
    <div className="min-h-96 mt-20 mx-10 ml-48 mr-48">
      <div className="text-3xl bg-blue-900 font-semibold text-white p-4 mb-4 rounded-t-lg">
        Your Posts
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Myposts.map((post: any) => (
          <div
            key={post._id}
            className="max-w-lg rounded overflow-hidden shadow-lg bg-white"
          >
            <Link href={`/share/${post._id}`}>
              <img
                className="w-full h-48 object-cover"
                src={post.image}
                alt={post.username}
              />
            </Link>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{post.username}</div>
              <p className="text-gray-700 text-base">{post.description}</p>
            </div>
            <div className="px-6 py-4 flex justify-between">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                Likes: {post.likes}
              </span>
              <span className="hover:cursor-pointer">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-red-600">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your Post and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeletePost(post._id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowMyPosts;
