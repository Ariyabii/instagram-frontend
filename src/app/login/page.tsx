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
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {});
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
      password: password,
      email: email,
      profileImage: "",
    };

    const jsonData = await fetch("https://ig-server-v2.onrender.com/login", {
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
          <CardTitle className="title">Instagram</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="email"
            value={email}
            onChange={email1}
            placeholder="Email"
            className="input"
          />
          {emailError && (
            <div className="text-red-500 text-small">hooson bn</div>
          )}
          <Input
            className="input"
            value={password}
            onChange={password1}
            placeholder="Password"
          />
          {passwordError && (
            <div className="text-red-500 text-small">Hooson bn</div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="loginButton"
            type="submit"
            onClick={() => signup()}
            disabled={false}
          >
            login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
