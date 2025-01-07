"use client";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";

export const PostHeader = ({
  username,
  profileImage,
}: {
  username: string;
  profileImage: string;
}) => {
  return (
    <div className="flex items-center gap-2 p-6 pt-8">
      <Avatar className="flex gap-2 items-center">
        <AvatarImage
          src={profileImage}
          className="rounded-full h-10 w-0"
        ></AvatarImage>
        <div className="font-bold">{username}</div>
      </Avatar>
    </div>
  );
};

export default PostHeader;
