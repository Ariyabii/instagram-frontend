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
  const [firstInput, setFirstInput] = useState<string>("");
  const [secondInput, setSecondInput] = useState<string>("");
  const [thirdInput, setThirdInput] = useState<string>("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {});
  const name1 = (e: { target: { value: string } }) => {
    setFirstInput(String(e.target.value));
  };
  const name2 = (e: { target: { value: string } }) => {
    setSecondInput(String(e.target.value));
  };
  const name3 = (e: { target: { value: string } }) => {
    setThirdInput(String(e.target.value));
  };
  const email1 = (e: ChangeEvent<HTMLInputElement>) => {
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
      username: thirdInput,
      password: password,
      email: email,
      profileImage: "url",
    };

    const jsonData = await fetch("https://ig-server-v2.onrender.com/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

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
          <Input value={firstInput} onChange={name1} placeholder="FirstName" />
          <Input value={secondInput} onChange={name2} placeholder="LastName" />
          <Input value={thirdInput} onChange={name3} placeholder="Username" />
          <Input
            type="email"
            value={email}
            onChange={email1}
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
