"use client";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import PrimaryButton from "./PrimaryButton";
import Textarea from "./Textarea";
import UploadPicture from "./UploadPicture";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../_lib/validationSchema";
import { createNewPost } from "../_lib/actions";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type FormProps = {
  userId: string;
  caption: string;
  hashtags: string;
  location: string;
  picture: File;
};
export default function CreatePostForm() {
  const { mutate, cache } = useSWRConfig();
  const methods = useForm<FormProps>({
    resolver: zodResolver(postSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const { data: session } = useSession();
  const router = useRouter();
  const submitForm: SubmitHandler<FormProps> = async (data) => {
    const formData: FormData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const response = await createNewPost(formData);
    if (!response.ok) {
      toast.error(response.message, {
        closeOnClick: true,
        theme: "colored",
        type: "error",
      });
    } else {
      mutate(
        (key: string) => [
          key?.includes("/api/post/all"),
          key?.includes(
            `/api/post/${session?.username}/createdPosts?userPosts`
          ),
        ],
        null,
        { revalidate: true }
      );
      router.push("/");
    }
  };
  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
        <Textarea
          name="caption"
          label={"caption"}
          placeholder="this is the photo"
        />

        <UploadPicture name="picture" />
        <Input
          name="location"
          label="add location"
          placeholder="amazon , iran "
        />
        <Input
          name="hashtags"
          label={`add tags (seperate by comma " , ")`}
          placeholder="art , expreince , nature "
        />

        <div className="flex justify-end gap-1">
          <button className="px-8 rounded-md bg-dark-4">Cancel</button>
          <div className="w-32">
            <PrimaryButton isLoading={isSubmitting} disabled={isSubmitting}>
              Create Post
            </PrimaryButton>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
