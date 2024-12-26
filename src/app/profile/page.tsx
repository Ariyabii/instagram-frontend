// "use client";

// import { useRouter } from "next/navigation";
// import { jwtDecode } from "jwt-decode";
// import { useState, useEffect } from "react";

// const Page = () => {
//   const [loading, setLoading] = useState<boolean>(true);
//   const router = useRouter();

//   const profile = async () => {
//     const jsonData = await fetch("https://ig-server-v2.onrender.com/profile");
//     const response = await jsonData.json();
//     setLoading(false);
//     console.log(response);
//   };
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken") ?? "";
//     console.log(token);
//     const decodedToken = jwtDecode(token);
//     console.log(decodedToken);
//     if (!token) {
//       router.push("/signup");
//       return;
//     }

//     profile();
//   }, []);
//   if (loading) return "loading";
// };
// export default Page;
