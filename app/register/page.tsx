import React from "react";
import Logo from "../_Icons/Logo";
import Image from "next/image";
import loginPicture from "@/public/side-img.png";
import RegisterForm from "../_Components/RegisterForm";

export default function page() {
  return (
    <div className="flex">
      <div className="grow-[.65] content-center text-center space-y-3">
        <div className="w-full">
          <Logo />
        </div>
        <div>
          <h1 className="text-4xl font-bold">create new account </h1>
          <p className="text-light-3 text-md">
            to use snapgram! please enter your deatils.
          </p>
        </div>
        <RegisterForm />
      </div>
      <div className="relative flex-1">
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
