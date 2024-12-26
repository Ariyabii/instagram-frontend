"use client";

import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { PostActions } from "@/custom_component/PostActions";
import { PostHeader } from "@/custom_component/PostHeader";
import { PostLikesDialog } from "@/custom_component/PostLikesDialog";
import { Card } from "@/components/ui/card";
import { House } from "lucide-react";

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
  // const { toast } = useToast();
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
    console.log(token);
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    if (!token) {
      router.push("/signup");
      return;
    }

    getPosts();
  }, []);
  if (loading) return "loading";

  return (
    <div>
      {posts?.map((post) => {
        return (
          <Card key={post._id} className="w-fit">
            <PostHeader />
            <div className="p-6 pt-0">
              <PostActions postId={post._id} likes={post?.likes} />
              <div className="flex">
                <div>{post.userId.username}</div>
                <div>{post.caption}</div>
              </div>
              <PostLikesDialog
                username={post.userId.username}
                isLikesDialogOpen={false}
                handleDialog={function (): void {}}
              />
            </div>
          </Card>
        );
      })}
      <div className="all">
        {" "}
        <House />
      </div>
    </div>
  );
};
export default Page;
