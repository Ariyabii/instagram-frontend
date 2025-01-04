"use client";

import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { PostActions } from "@/custom_component/PostActions";
import { PostHeader } from "@/custom_component/PostHeader";
import { PostLikesDialog } from "@/custom_component/PostLikesDialog";
import { House } from "lucide-react";
import { SquarePlus } from "lucide-react";
import { SquareUser } from "lucide-react";

type likeTypes = {
  postlikeImage: string;
  username: string;
  _id: string;
};

type postType = {
  _id: string;
  caption: string;
  profileImage: string;
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
    const jsonData = await fetch("https://ig-service-mi3q.onrender.com/posts");
    const response = await jsonData.json();
    setPosts(response);
    setLoading(false);
    console.log(response);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken") ?? "";
    console.log(token);
    const decodedToken = jwtDecode(token);
    if (!token) {
      router.push("/signup");
      return;
    }

    getPosts();
    console.log(decodedToken);
  }, [router]);
  if (loading) return "loading";

  return (
    <div className="bg-black flex flex-col text-white">
      <img
        src="https://t4.ftcdn.net/jpg/03/97/48/01/360_F_397480131_ifXqWNKVteOhczWDJBeODrnMIbVcVp13.jpg"
        className="w-40 h-15 ms-3"
      />
      {posts?.map((post) => {
        return (
          <div key={post._id}>
            <div className="font-bold">
              <PostHeader
                profileImage={post.profileImage}
                username={post.userId.username}
              />
            </div>
            <div className="p-6 pt-0">
              <PostActions
                postId={post._id}
                likes={post?.likes}
                postImage={post.postImage}
                signupId={post._id}
              />
              <div className="flex gap-3">
                <div className="font-bold">{post.userId.username}</div>
                <div className="font-medium">{post.caption}</div>
              </div>
              <PostLikesDialog
                username={post.userId.username}
                isLikesDialogOpen={false}
                handleDialog={function (): void {}}
              />
              <div
                className="text-slate-300"
                onClick={() => router.push(`/comment/${post._id}`)}
              >
                View all comments
              </div>
              <div onClick={() => router.push(`/profile/${post._id}`)}>
                View profile
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex justify-between">
        <House />
        <SquarePlus />
        <SquareUser />
      </div>
    </div>
  );
};
export default Page;
