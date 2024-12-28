import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const CommentHeader = ({
  profileImage,
  userId,
}: {
  profileImage: string;
  userId: string;
}) => {
  return (
    <div className="flex items-center gap-2 p-6 pt-8">
      <div>
        <Avatar>
          <AvatarImage
            className="profileImg"
            src={
              "https://images.unsplash.com/photo-1734366965582-1f5bc9d4e21a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D"
            }
          ></AvatarImage>
          <AvatarFallback>
            {profileImage},{userId}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default CommentHeader;
