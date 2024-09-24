"use client";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { NewUserDetails } from "@/app/_types";
import { registerSchema } from "@/app/_lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { regsiterUser } from "@/app/_lib/actions";
import PrimaryButton from "@/app/_Components/PrimaryButton";
import SpinnerMini from "@/app/_Components/SpinnerMini";
import Input from "@/app/_Components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const router = useRouter();
  const methods = useForm<NewUserDetails>({
    resolver: zodResolver(registerSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleRegister: SubmitHandler<NewUserDetails> = async (data) => {
    try {
      const registerResponse:any = await regsiterUser(data);
      // console.log(registerResponse.ok);
      //login if user is new
      if (registerResponse.status === 201) {
        await signIn("credentials", {
          ...data,
          redirect: false,
        });

        router.push("/");
      }
      if (!registerResponse.ok ) {
        toast(registerResponse?.message, {
          type: "error",
          theme: "colored",
          closeOnClick: true,
        });
      }
    } catch (error: any) {
      toast(error?.message, {
        type: "error",
        theme: "colored",
        closeOnClick: true,
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col w-full px-4 mx-auto md:w-7/12 lg:px-0"
        onSubmit={handleSubmit(handleRegister)}
      >
        <div className="space-y-4">
          <Input
            name="name"
            label="name"
            type="text"
            placeholder="please enter your name"
          />
          <Input
            name="username"
            label="user name"
            type="text"
            placeholder="please enter your user name"
          />
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
              {isSubmitting ? <SpinnerMini /> : "Sign up"}
            </PrimaryButton>
          </div>

          <div className="space-x-1 text-off-white">
            <span>Already have an account?</span>
            <Link
              href={"/login"}
              className="underline text-primary-600 underline-offset-4"
            >
              Log in
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
