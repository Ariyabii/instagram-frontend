/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/custom_component/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";

<Footer />;
const Page = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const router = useRouter();

  const uploadImages = async () => {
    if (!images) return;
    const uploadPromises = Array.from(images).map(async (image) => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ace_area");
      formData.append("cloud_name", "dl93ggn7x");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dl93ggn7x/image/upload",
        { method: "POST", body: formData }
      );
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      const result = await response.json();
      return result.secure_url;
    });
    const uploadedUrls = await Promise.all(uploadPromises);
    setUploadedImages(uploadedUrls.filter((url) => url !== null) as string[]);
  };
  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      {" "}
      <input
        type="file"
        multiple
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            setImages(files);
          }
        }}
        className="file:border file:border-gray-300 file:rounded-md file:px-4 file:py-2 file:bg-blue-50 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100"
      />{" "}
      <button onClick={uploadImages}>Upload</button>{" "}
      <Button className="text-base" onClick={() => router.push("/posts")}>
        Post
      </Button>
      <Input placeholder="Add a caption"></Input>
      <div className="mt-4 text-center">
        {" "}
        {uploadedImages.map((img, index) => (
          <img
            key={index}
            src={img}
            className="max-w-full h-[300px] rounded-lg shadow-lg"
          />
        ))}{" "}
      </div>{" "}
    </div>
  );
};
export default Page;
