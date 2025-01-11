import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileHeader({ profileImage }: { profileImage: string }) {
  return (
    <Avatar className="text-white w-30 h-10 ">
      <AvatarImage src={profileImage} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
export default ProfileHeader;
