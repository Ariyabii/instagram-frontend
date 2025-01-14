import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileHeader({ profileImage }: { profileImage: string }) {
  return (
    <Avatar className="zurg">
      <AvatarImage src={profileImage} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
export default ProfileHeader;
