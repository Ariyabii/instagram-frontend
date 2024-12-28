import { CommentsDialog } from "@/custom_component/CommentsDialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

type tokentype = { userId: string; username: string };

type commentTypes = {
  comments: string;
  username: string;
  _id: string;
};

export const CommentActions = ({
  comments,
  commentId,
}: {
  commentId: string;
  comments: commentTypes[];
}) => {
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const handleDialog = () => setCommentDialogOpen((prev) => !prev);

  const token = localStorage.getItem("accessToken") ?? "";
  const decodedToken: tokentype = jwtDecode(token);
  const { username } = decodedToken;

  const isUserComment = comments.filter(
    (comment) => comment.username === username
  );
  console.log(isUserComment);

  const router = useRouter();
  console.log(router);

  const handlecomment = async () => {
    if (isUserComment) {
      const response = await fetch(
        "https://ig-server-v2.onrender.com/post/comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentId,
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
      <CommentsDialog
        username={commentId}
        commentDialogOpen={commentDialogOpen}
        handleDialog={handleDialog}
      />
      <div onClick={handlecomment}></div>
    </>
  );
};

export default CommentActions;
