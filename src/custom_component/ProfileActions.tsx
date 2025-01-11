import { ProfileDialog } from "@/custom_component/ProfileDialog";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

type tokentype = { userId: string; username: string };

type ProfileTypes = {
  username: string;
  userId: string;
  profile: string;
};

export const ProfileActions = ({
  userId,
  profile,
}: {
  userId: string;
  profile: ProfileTypes[];
}) => {
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const handleDialog = () => setProfileDialogOpen((prev) => !prev);

  const token = localStorage.getItem("accessToken") ?? "";
  const decodedToken: tokentype = jwtDecode(token);
  const { username } = decodedToken;

  const isUser = profile.filter((user) => user.username === username);
  // const router = useRouter();

  const handleProfile = async () => {
    if (isUser) {
      const response = await fetch(
        "https://ig-service-mi3q.onrender.com/post/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: username,
          }),
        }
      );
      const res = await response.json();
      console.log(res);
    }
  };
  return (
    <>
      <ProfileDialog
        username={userId}
        profileDialogOpen={profileDialogOpen}
        handleDialog={handleDialog}
      />
      <div onClick={handleProfile}></div>
    </>
  );
};

export default ProfileActions;
