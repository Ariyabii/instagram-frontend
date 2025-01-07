"use client";

import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { PostActions } from "@/custom_component/PostActions";
import { PostHeader } from "@/custom_component/PostHeader";
import { PostLikesDialog } from "@/custom_component/PostLikesDialog";
import { Header } from "@/custom_component/Header";
import { Footer } from "@/custom_component/Footer";

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
      <Header />
      {posts?.map((post) => {
        return (
          <div key={post._id}>
            <div
              className="font-bold"
              onClick={() => router.push(`/profile/${post._id}`)}
            >
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
                View all comments{" "}
              </div>
            </div>
          </div>
        );
      })}
      <Footer />
    </div>
  );
};
export default Page;
