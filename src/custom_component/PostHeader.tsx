import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const PostHeader = ({
  post,
  profileImage,
}: {
  post: string;
  profileImage: string;
}) => {
  return (
    <div className="flex items-center gap-2 p-6 pt-8">
      <Avatar>
        <AvatarImage>{profileImage}</AvatarImage>
        <AvatarFallback>CN{post}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default PostHeader;
