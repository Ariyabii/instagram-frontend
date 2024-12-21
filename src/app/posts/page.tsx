"use client";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { PostActions } from "@/custom_component/postActions";
import { PostHeader } from "@/custom_component/PostHeader";
import { PostLikesDialog } from "@/custom_component/PostLikesDialog";
import { Card } from "@/components/ui/card";

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
      router.push("/signup");
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
      <div className="ig">
        <img
          src="https://www.pngkey.com/png/full/1-13459_instagram-font-logo-white-png-instagram-white-text.png"
          width="100px"
          height="100px"
        />
      </div>
      {posts?.map((post) => {
        return (
          <Card key={post._id} className="w-fit">
            <PostHeader username={post.userId.username}></PostHeader>
            <div className="p-6 pt-0">
              <PostActions postId={post._id}></PostActions>
              <div className="flex">
                <div>{post.userId.username}</div>
                <div>{post.caption}</div>
              </div>
              <PostLikesDialog></PostLikesDialog>
            </div>
          </Card>
        );
      })}
      ;
    </div>
  );
};
export default Page;
