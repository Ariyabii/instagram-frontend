"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
      "https://ig-server-v2.onrender.com/getCommentsByPostId/" + id
    );
    const comments = await data.json();
    setComments(comments);
  };
  useEffect(() => {
    getComments();
  }, [router]);
  console.log(comments);

  return (
    <div>
      {comments.map((comment, i) => {
        <div className="head"></div>;
        return (
          <div className="comment" key={i}>
            <div className="name">Comments</div>
            <div className="comm">
              <div className="img">
                <img src={comment.profileImage} width="30px" height="20px" />
              </div>
              <div>{comment.userId.username}</div>
              <div>{comment.comments}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
