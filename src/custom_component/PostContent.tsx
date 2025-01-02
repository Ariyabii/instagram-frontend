import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";

export const PostContent = ({ postImage }: { postImage: string }) => {
  return (
    <div className="flex items-center gap-2 p-6 pt-8">
      <div>
        <Avatar>
          <AvatarImage>{postImage}</AvatarImage>
          {/* <AvatarFallback>CN</AvatarFallback> */}
        </Avatar>
      </div>
    </div>
  );
};

export default PostContent;
