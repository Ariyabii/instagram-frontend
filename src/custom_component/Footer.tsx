import { jwtDecode } from "jwt-decode";
import { House } from "lucide-react";
import { SquarePlus } from "lucide-react";
import { SquareUser } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type profileType = {
  _id: string;
  profileImage: string;
  userId: {
    username: string;
  };
  postImage: string;
}[];

export const Footer = () => {
  const [profile, setProfile] = useState<profileType>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const getProfile = async () => {
    const jsonData = await fetch("https://ig-service-mi3q.onrender.com/posts");
    const response = await jsonData.json();
    setProfile(response);
    setLoading(false);
    console.log(response);
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken") ?? "";
    console.log(token);
    const decodedToken = jwtDecode(token);
    if (!token) {
      router.push("/signup");
      return;
    }

    getProfile();
    console.log(decodedToken);
  }, [router]);
  if (loading) return "loading";
  console.log(profile);
  return (
    <div className="flex justify-between ">
      <House onClick={() => router.push(`/posts`)} />
      <SquarePlus onClick={() => router.push(`/createPost`)} />
      <SquareUser onClick={() => router.push(`/profile`)} />
    </div>
  );
};
export default Footer;
