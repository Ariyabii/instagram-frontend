import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileHeader() {
  return (
    <Avatar className="w-11 h-11">
      <AvatarImage src="https://images.unsplash.com/profile-1670557877197-89472f9c8a29image?w=64&dpr=2&crop=faces&bg=%23fff&h=64&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
export default ProfileHeader;
