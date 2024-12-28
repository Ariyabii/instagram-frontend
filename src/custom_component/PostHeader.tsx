import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const PostHeader = ({
  profileImage,
  postId,
}: {
  profileImage: string;
  postId: string;
}) => {
  return (
    <div className="flex items-center gap-2 p-6 pt-8">
      <div>
        <Avatar>
          <AvatarImage
            src={
              "https://www.pngkey.com/png/full/1-13459_instagram-font-logo-white-png-instagram-white-text.png"
            }
          ></AvatarImage>
          <AvatarFallback>
            {profileImage},{postId}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default PostHeader;
