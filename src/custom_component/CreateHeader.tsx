"use client";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";

export const CreateHeader = () => {
  return (
    <div className="flex h-44 w-60">
      <Avatar>
        <AvatarImage
          src="https://t4.ftcdn.net/jpg/03/97/48/01/360_F_397480131_ifXqWNKVteOhczWDJBeODrnMIbVcVp13.jpg"
          className=""
        ></AvatarImage>
      </Avatar>
    </div>
  );
};

export default CreateHeader;
