"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  // CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Bookmark } from "lucide-react";
import { Heart } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";

import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

type likeTypes = {
  postlikeImage: string;
  username: string;
  _id: string;
};

type postType = {
  _id: string;
  caption: string;
  profileimage: string;
  userId: {
    username: string;
  };
  postImage: string;
  likes: likeTypes[];
}[];

const Page = () => {
  const [posts, setPosts] = useState<postType>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const getPosts = async () => {
    const jsonData = await fetch("https://ig-server-v2.onrender.com/posts");
    const response = await jsonData.json();
    setPosts(response);
    setLoading(false);
    console.log(response);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken") ?? "";
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    if (!token) {
      router.push("/signUp");
      return;
    }

    getPosts();
  }, [router]);
  if (loading) return "loading";

  const handleClickComments = (postId: string) => {
    router.push("comment/" + postId);
  };

  return (
    <div className="all">
      {posts?.map((post) => {
        return (
          <Card key={post._id} className="w-fit">
            {" "}
            <CardHeader>
              <div className="flex space-x-2">
                <div>{post.userId.username}</div>
              </div>
            </CardHeader>
            <Carousel>
              <CarouselContent>
                {" "}
                <img src={post.postImage} width="376px" height="600px" />
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <CardContent>
              <div className="">{post.caption}</div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex space-y-0">
                <Heart />
                <MessageCircle />
                <Send />
              </div>
              <Bookmark />
            </CardFooter>
            <div className="liked">
              <div> 0 likes</div>
              <div>{post.userId.username} ...</div>
              <button
                className="view"
                onClick={() => handleClickComments(post._id)}
              >
                View all comments
              </button>
            </div>
          </Card>
        );
      })}
      <div></div>
    </div>
  );
};

export default Page;
