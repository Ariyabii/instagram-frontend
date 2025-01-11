"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { CommentHeader } from "@/custom_component/CommentHeader";
import { CommentsDialog } from "@/custom_component/CommentsDialog";
import { ArrowBigLeftDash } from "lucide-react";
import { CommentActions } from "@/custom_component/CommentActions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CommentType = {
  _id: string;
  comments: string;
  postId: string;
  profileImage: string;
  userId: {
    _id: string;
    username: string;
    password: string;
    email: string;
    following: string[];
    followers: string[];
  };
};

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [comments, setComments] = useState<CommentType[]>([]);
  const router = useRouter();

  const getComments = async () => {
    const data = await fetch(
      `https://ig-service-mi3q.onrender.com/getCommentsByPostId/${id}`
    );
    const comments = await data.json();
    setComments(comments);
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken") ?? "";
    const decodedToken = jwtDecode(token);
    if (!token) {
      router.push("/signup");
      return;
    }
    console.log(decodedToken);
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(comments);

  return (
    <div className="bg-black h-100 flex flex-col">
      {comments.map((comment, i) => {
        return (
          <div key={i}>
            <div className="flex gap-2 text-white">
              <ArrowBigLeftDash onClick={() => router.push("/posts")} />
              Comments
            </div>
            <div className="flex items-center gap-2 font-bold">
              <CommentHeader profileImage={comment.profileImage} />
              <CommentActions commentId={comment._id} comments={[]} />
              <div>{comment.userId.username}</div>
              <div>{comment.comments}</div>
            </div>
            <CommentsDialog
              username={comment.userId.username}
              commentDialogOpen={false}
              handleDialog={function (): void {}}
            />
            <div className=" text-white flex items-center justify-end">
              <Textarea className="text-grey" placeholder="Add a comment" />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Post</Button>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
