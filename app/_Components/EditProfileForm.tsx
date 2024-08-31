"use client";
import React from "react";
import Input from "@/app/_Components/Input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import PrimaryButton from "./PrimaryButton";
import { AuthenticatedUser } from "../_types";
import { editUserSchema } from "../_lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Textarea from "./Textarea";
import { updateUser } from "../_lib/actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
type Props = {
  session: AuthenticatedUser;
};
export default function EditProfileForm({ session }: Props) {
  const { update } = useSession();

  const methods = useForm<AuthenticatedUser>({
    resolver: zodResolver(editUserSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const router = useRouter();
  const handleUpdate: SubmitHandler<AuthenticatedUser> = async (data) => {
    const { status, newUserInfo } = await updateUser(data);
    if (status === 200) {
      //update the session infos in the client components
      await update({
        name: newUserInfo.name,
        user: { name: newUserInfo.name },
      });
      router.push(`/account/${newUserInfo.username}`);
    }
  };
  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={handleSubmit(handleUpdate)}>
        <Input
          name="name"
          label="Name"
          defaultValue={session.name}
          placeholder="enter your name!"
        />
        <Input
          name="username"
          label="username"
          defaultValue={session.username}
          placeholder="your name!"
          disabled={true}
        />
        <Input
          name="email"
          label="email"
          defaultValue={session.email}
          placeholder="your email!"
          disabled
        />
        <Input
          name="password"
          label="password"
          placeholder="enter your new password"
        />
        <Input name="userId" type="hidden" defaultValue={session.id} />
        <Textarea name="bio" defaultValue={session.bio} />
        <div className="flex justify-end gap-1">
          <button className="px-8 rounded-md bg-dark-4">Cancel</button>
          <div className="w-[13%]">
            <PrimaryButton disabled={isSubmitting} isLoading={isSubmitting}>
              update profile
            </PrimaryButton>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
