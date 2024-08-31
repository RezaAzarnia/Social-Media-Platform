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
    try {
      const loginResponse = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (loginResponse?.error) {
        toast("Email or password is wrong", {
          type: "error",
          theme: "colored",
          closeOnClick: true,
        });
        return
      }
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast(error?.message, {
          type: "error",
          theme: "colored",
          closeOnClick: true,
        });
      }
    }
  };
  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col w-1/2 mx-auto"
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

          <PrimaryButton disabled={isSubmitting}>
            {isSubmitting ? <div className="spinner-mini"></div> : "log in"}
          </PrimaryButton>

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
