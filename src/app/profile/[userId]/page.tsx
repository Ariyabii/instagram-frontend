"use client";

import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect, use } from "react";
import { Settings } from "lucide-react";
import { ProfileHeader } from "@/custom_component/ProfileHeader";

type ProfileType = {
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

const Page = ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = use(params);
  console.log(userId);
  const [profile, setProfile] = useState<ProfileType[]>([]);
  const router = useRouter();

  const getProfile = async () => {
    const jsonData = await fetch(
      `https://ig-service-mi3q.onrender.com/getProfileId/${userId}`
    );
    const profile = await jsonData.json();
    setProfile(profile);
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken") ?? "";
    console.log(token);
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    if (!token) {
      router.push("/signup");
      return;
    }
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(profile);
  return (
    <div className="bg-black flex flex-col text-white">
      {profile.map((pro, i) => {
        return <div key={i}></div>;
      })}
      <div className="flex w-100 h-10 justify-between ">
        <Settings />
        <div> username </div>
      </div>
      <div className="flex ml-10 mt-20">
        <ProfileHeader profileImage={""} />
      </div>
    </div>
  );
};
export default Page;
