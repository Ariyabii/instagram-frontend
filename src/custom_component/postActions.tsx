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
    }
  };

  return (
    <>
      <div className=" flex justify-between">
        <div className="flex gap-2 flex-col ">
          <img src={postImage} />
          <div className="flex flex-row">
            <Heart
              onClick={handleLike}
              color={isUserLiked ? "red" : "black"}
              fill={isUserLiked ? "red" : "white"}
            />
            <MessageCircle onClick={() => router.push(`/comment/${postId}`)} />
            <Send onClick={() => router.push(`/profile/${signupId}`)} />
            <Bookmark className="flex justify-between" />
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
