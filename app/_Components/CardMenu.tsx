"use client";
import React, { useState, useTransition } from "react";
import DeleteIcon from "../_Icons/DeleteIcon";
import Dots from "../_Icons/Dots";
import Edit from "../_Icons/Edit";
import { toast } from "react-toastify";
import SpinnerMini from "./SpinnerMini";
import { deletePost } from "../_lib/actions";
import { usePostContext } from "./PostContextProvider";
import { usePathname, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Post } from "../_types";

type Props = {
  postId: string;
};
export default function CardMenu({ postId }: Props) {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const { posts, setPosts, setPostsLength } = usePostContext();
  const pathname = usePathname();
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
      if (response.status === 200) {
        //filter posts to prevent revalidate all posts
        const filteredPosts = posts.filter((post: Post) => post.id !== postId);
        setPosts(filteredPosts);
        setPostsLength(response.postsLength);
        //redirect the user to main page if the user in the signle post page
        if (pathname.includes("/post")) {
          router.push("/");
          revalidatePath("/");
        }
      }
    });
  };
  return (
    <div className="relative">
      <button onClick={() => setIsShowMenu((prev) => !prev)}>
        <Dots />
      </button>
      {isShowMenu && (
        <ul
          className={`absolute w-40 right-0 top-5 z-50 rounded-sm bg-white
        ${isShowMenu && "active-menu"}
        `}
        >
          <li className="menu-item">
            <button className="border-b hover:bg-red " onClick={deleteUserPost}>
              <span>{isPending ? <SpinnerMini /> : <DeleteIcon />}</span>
              delete
            </button>
          </li>
          <li className="menu-item ">
            <button
              className="gap-1 hover:bg-primary-600"
              onClick={showWarningMessage}
            >
              <Edit />
              edit
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
