import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";

export const CommentHeader = ({ profileImage }: { profileImage: string }) => {
  return (
    <div className="flex items-center gap-2 p-6 pt-8">
      <Avatar className="flex gap-2 items-center">
        <AvatarImage
          src={profileImage}
          className="rounded-full h-10 w-0"
        ></AvatarImage>
      </Avatar>
    </div>
  );
};

export default CommentHeader;
