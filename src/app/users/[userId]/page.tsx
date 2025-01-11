"use client";

import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect, use } from "react";
import { Settings } from "lucide-react";
import { ProfileHeader } from "@/custom_component/ProfileHeader";
import { ProfileActions } from "@/custom_component/ProfileActions";
import { ProfileDialog } from "@/custom_component/ProfileDialog";

type profileType = {
  _id: string;
  profileImage: string;
  userId: {
    _id: string;
    username: string;
    password: string;
    email: string;
    following: string[];
    followers: string[];
  };
};
type decodedType = {
  username: string;
  userId: string;
};
const Page = ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = use(params);
  const [users, setUsers] = useState<profileType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem("accessToken") ?? "";
  const decodedToken: decodedType = jwtDecode(token);
  const accountId = decodedToken.userId;
  console.log(accountId);
  const router = useRouter();

  const getProfile = async () => {
    const jsonData = await fetch(
      `https://ig-service-mi3q.onrender.com/getProfileId/${userId}`
    );
    const profile = await jsonData.json();
    setUsers(profile);
    setLoading(false);
  };
  useEffect(() => {
    if (!token) {
      router.push("/signup");
      return;
    }
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) return "loading";
  return (
    <div className="bg-black flex flex-col text-white">
      {users.map((user, i) => {
        return (
          <div key={i}>
            <div className="flex w-100 h-10 justify-between ">
              <Settings className="flex ml-3" />
              <div className="text-white">{user.userId.username}</div>
            </div>
            <div className="flex ml-10 mt-20 w-50 h-30">
              <ProfileHeader profileImage={user.profileImage} />
              <ProfileActions userId={user._id} profile={[]} />
              <ProfileDialog
                profileDialogOpen={false}
                handleDialog={function (): void {}}
                username={user.userId.username}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
console.log("kk");
export default Page;
