/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Bookmark } from "lucide-react";
import { Heart } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Send } from "lucide-react";
import { PostLikesDialog } from "./PostLikesDialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

type tokentype = { userId: string; username: string };

type likeTypes = {
  postlikeImage: string;
  username: string;
  _id: string;
};

export const PostActions = ({
  postImage,
  postId,
  signupId,
  likes,
}: {
  postId: string;
  likes: likeTypes[];
  postImage: string;
  signupId: string;
}) => {
  const [isLikesDialogOpen, setIsLikesDialogOpen] = useState(false);
  const handleDialog = () => setIsLikesDialogOpen((prev) => !prev);

  const token = localStorage.getItem("accessToken") ?? "";
  const decodedToken: tokentype = jwtDecode(token);
  const { username } = decodedToken;

  const isUserLiked =
    likes.filter((like) => like.username === username).length > 0;

  const router = useRouter();

  const handleLike = async () => {
    if (isUserLiked) {
      const response = await fetch(
        "https://ig-service-mi3q.onrender.com/post/like",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId,
            signupId,
            userId: username,
          }),
        }
      );
      const res = await response.json();
      console.log(res);
      console.log(response);
    }
  };
  handleLike();

  return (
    <>
      <div className=" flex">
        <div className="flex gap-4 flex-col">
          <img src={postImage} />
          <div className="flex">
            <Heart
              onClick={handleDialog}
              color={isUserLiked ? "black" : ""}
              fill={isUserLiked ? "white" : "red"}
            />
            <MessageCircle onClick={() => router.push(`/comment/${postId}`)} />
            <Send onClick={() => router.push(`/profile/${signupId}`)} />
            <Bookmark className="bookmark" />
            <PostLikesDialog
              username={postId}
              isLikesDialogOpen={isLikesDialogOpen}
              handleDialog={handleDialog}
            />
          </div>
          <div className="font-Bold text-lg" onClick={handleDialog}>
            {username} likes
          </div>
        </div>
      </div>
    </>
  );
};

export default PostActions;
