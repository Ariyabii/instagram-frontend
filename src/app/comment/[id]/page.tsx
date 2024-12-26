"use client";
import { use, useEffect, useState } from "react";

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

  const getComments = async () => {
    const data = await fetch(
      `https://ig-server-v2.onrender.com/getCommentsByPostId/${id}`
    );
    const comments = await data.json();
    setComments(comments);
  };
  useEffect(() => {
    getComments();
  }, []);
  console.log(comments);

  return (
    <div>
      {comments.map((comment, i) => {
        return (
          <div className="comment" key={i}>
            <div className="name">Comments</div>
            <div className="img">
              <img src={comment.profileImage} />
            </div>
            <div>
              {comment.userId.username}
              {comment.comments}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
