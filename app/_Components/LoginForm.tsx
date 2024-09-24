"use client";
import Link from "next/link";
import React from "react";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import { LoginCredentials } from "@/app/_types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/_lib/validationSchema";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const router = useRouter();

  const methods = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const handleLogin: SubmitHandler<LoginCredentials> = async (data) => {
    const loginResponse = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    // console.log(loginResponse);

    if (loginResponse?.error) {
      toast("Email or password is wrong!!", {
        type: "error",
        theme: "colored",
        closeOnClick: true,
      });
      return;
    } else {
      router.push("/");
    }
  };
  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col w-full px-4 mx-auto lg:px-0 md:w-7/12"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="space-y-6">
          <Input
            name="email"
            label="Email address"
            type="text"
            placeholder="please enter your email address"
          />

          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="please enter your password"
          />
          <div className="w-full">
            <PrimaryButton disabled={isSubmitting}>
              {isSubmitting ? <div className="spinner-mini"></div> : "log in"}
            </PrimaryButton>
          </div>

          <div className="space-x-1 text-off-white">
            <span>Don&apos;t have an account?</span>
            <Link
              href={"/register"}
              className="underline text-primary-600 underline-offset-4"
            >
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
