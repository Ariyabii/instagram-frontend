import { jwtDecode } from "jwt-decode";
import { House } from "lucide-react";
import { SquarePlus } from "lucide-react";
import { SquareUser } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

type profileType = {
  _id: string;
  profileImage: string;
  userId: {
    username: string;
  };
  postImage: string;
}[];
type decodedType = {
  username: string;
  userId: string;
};
export const Footer = () => {
  const [profile, setProfile] = useState<profileType>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const token = localStorage.getItem("accessToken") ?? "";
  const decodedToken: decodedType = jwtDecode(token);
  const accountId = decodedToken.userId;

  const getProfile = async () => {
    const jsonData = await fetch("https://ig-service-mi3q.onrender.com/posts");
    const response = await jsonData.json();
    setProfile(response);
    setLoading(false);
  };
  useEffect(() => {
    if (!token) {
      router.push("/signup");
      return;
    }
    getProfile();
  }, []);
  if (loading) return "loading";
  console.log(profile);
  return (
    <div className="aa">
      <House onClick={() => router.push(`/posts`)} />
      <SquarePlus onClick={() => router.push(`/createPost`)} />
      <Search />
      <SquareUser onClick={() => router.push(`/users/${accountId}`)} />
    </div>
  );
};
export default Footer;
