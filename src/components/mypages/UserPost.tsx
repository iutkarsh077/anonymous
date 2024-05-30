"use client";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { MouseEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const UserPost = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [fileInputPlaceholder, setFileInputPlaceholder] =
    useState<string>("No file Chosen");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files ? event.target.files[0] : null;
    if (file?.type === "application/pdf") {
      toast({
        title: "Unsupported file type",
        description: "Please upload an image file",
      });
      setFileInputPlaceholder("Select a file");
      file = null;
      return;
    }
    setSelectedFile(file);
    setFileInputPlaceholder(file?.name || "Select a file");
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    formData.append("text", text);
    try {
      const response = await axios.post("/api/post-upload", formData);
     const data = await response.data;
    //  console.log(data);
     toast({
        title: "Post uploaded",
        description: "Your post has been uploaded successfully",
     })
     setSelectedFile(null);
     setFileInputPlaceholder("No file chosen");
      setText("");
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later",
      });
    }
  };

  return (
    <div className="p-4 mt-10 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Anonymous Post</h2>
      <div className="grid w-full max-w-sm items-center gap-4 mx-auto">
        <label
          htmlFor="picture"
          className="block text-sm font-medium text-gray-700"
        >
          Picture
        </label>
        <label htmlFor="picture" className="relative cursor-pointer">
          <span className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500 py-2 px-3">
            {fileInputPlaceholder}
          </span>
          <input
            id="picture"
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="mt-4">
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Write your post here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className="mt-4 text-center">
        <Button
          onClick={handleSubmit}
          disabled={text === "" && selectedFile === null}
          className="px-4 py-2 text-white font-semibold rounded-lg"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default UserPost;
