import Image from "next/image";
import React from "react";
import loginPicture from "@/public/side-img.png";
import Logo from "../_Icons/Logo";
import LoginForm from "../_Components/LoginForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "SnappGram | Login",
  description:
    "Access your SnappGram account. Log in to connect with friends, share moments, and explore a vibrant social media community.",
    robots: { index: true, follow: true },

  };

export default function Page() {
  return (
    <div className="flex flex-1 h-screen">
      <div className="content-center flex-1 space-y-5 text-center">
        <div className="w-full">
          <Logo />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold md:text-4xl">Log in your account </h1>
          <p className="text-sm text-light-3 md:text-md">
            welcome back! please enter your deatils.
          </p>
        </div>
        <LoginForm />
      </div>
      <div className="relative lg:flex-1">
        <Image
          src={loginPicture}
          fill={true}
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="side image for the login page"
        />
      </div>
    </div>
  );
}
