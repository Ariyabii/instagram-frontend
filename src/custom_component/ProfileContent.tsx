import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const ProfileContent = ({ postImage }: { postImage: string }) => {
  return (
    <div className="flex items-center gap-2 p-6 pt-8">
      <div>
        <Avatar>
          <AvatarImage>{postImage}</AvatarImage>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default ProfileContent;
