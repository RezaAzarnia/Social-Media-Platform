import React from "react";
import Logo from "../_Icons/Logo";
import Image from "next/image";
import loginPicture from "@/public/side-img.png";
import RegisterForm from "../_Components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SnappGram | Create New Account",
  description:
    "Join SnappGram by creating a new account. Sign up to connect with friends, share moments, and explore a vibrant social media community.",
  robots: { index: true, follow: true },
};

export default function page() {
  return (
    <div className="flex flex-1 h-screen">
      <div className="content-center flex-1 space-y-3 text-center">
        <div className="w-full">
          <Logo />
        </div>
        <div>
          <h1 className="text-3xl font-bold md:text-4xl">create new account </h1>
          <p className="text-sm text-light-3 md:text-md">
            to use snapgram! please enter your deatils.
          </p>
        </div>
        <RegisterForm />
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
