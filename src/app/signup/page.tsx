"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useEffect } from "react";
export default function Page() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {});
  const firstNameValue = (e: { target: { value: string } }) => {
    setFirstName(String(e.target.value));
  };
  const lastNameValue = (e: { target: { value: string } }) => {
    setLastName(String(e.target.value));
  };
  const userNameValue = (e: { target: { value: string } }) => {
    setUserName(String(e.target.value));
  };
  const emailValue = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    handleError();
  };

  const signup = async () => {
    if (email === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    router.push("/posts");

    const input = {
      username: userName,
      password: password,
      email: email,
      profileImage: "",
    };

    const jsonData = await fetch(
      "https://instagram-backend-fby5.onrender.com/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    const data = await jsonData.json();
    const token = data.token;
    localStorage.setItem("accessToken", token);
  };

  const handleError = () => {
    if (email === "") {
      setEmailError(false);
    }
    if (password === "") {
      setPasswordError(false);
    }
  };

  const password1 = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    handleError();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Instagram</CardTitle>
          <CardDescription>
            Sign up to see photos and videos frm your friends.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={firstName}
            onChange={firstNameValue}
            placeholder="FirstName"
          />
          <Input
            value={lastName}
            onChange={lastNameValue}
            placeholder="LastName"
          />
          <Input
            value={userName}
            onChange={userNameValue}
            placeholder="Username"
          />
          <Input
            type="email"
            value={email}
            onChange={emailValue}
            placeholder="Email"
          />
          {emailError && (
            <div className="text-red-500 text-small">hooson bn</div>
          )}
          <Input value={password} onChange={password1} placeholder="Password" />
          {passwordError && (
            <div className="text-red-500 text-small">Hooson bn</div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" onClick={() => signup()} disabled={false}>
            Signup
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
