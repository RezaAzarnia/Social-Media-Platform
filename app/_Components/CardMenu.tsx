"use client";
import React, { useTransition } from "react";
import DeleteIcon from "../_Icons/DeleteIcon";
import Edit from "../_Icons/Edit";
import { toast } from "react-toastify";
import SpinnerMini from "./SpinnerMini";
import { deletePost } from "../_lib/actions";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

type Props = {
  postId: string;
};
export default function CardMenu({ postId }: Props) {
  const [isPending, startTransition] = useTransition();
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const showWarningMessage = (): void => {
    toast("we are making this part🙂", {
      type: "info",
      theme: "colored",
      closeOnClick: true,
    });
  };

  const deleteUserPost = async (): Promise<void> => {
    startTransition(async () => {
      //delete the post
      const response = await deletePost(postId);
      //mutate the main page and explore and all the items have post in key
      mutate(
        (key: string[]) => key[0]?.startsWith("/api/post"),
        (data: any) => console.log(data),
        {
          revalidate: true,
        }
      );
      if (response.status === 200) {
        router.push("/");
      }
    });
  };
  return (
    <div className="relative">
      <ul className="flex items-center gap-3 no-underline">
        <li>
          <button onClick={deleteUserPost}>
            <span>{isPending ? <SpinnerMini /> : <DeleteIcon />}</span>
          </button>
        </li>
        <li>
          <button onClick={showWarningMessage}>
            <Edit />
          </button>
        </li>
      </ul>
    </div>
  );
}
