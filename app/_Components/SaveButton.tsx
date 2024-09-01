"use client";
import React, { useState } from "react";
import { toggleSavePost } from "../_lib/actions";
import Saved from "../_Icons/Saved";
import Save from "../_Icons/Save";
import { Post } from "../_types";

type Props = {
  post: Post;
};
export default function SaveButton({ post }: Props) {
  const [isSaved, setIsSaved] = useState<boolean>(post.isSaved);

  const handleToggleSave = async (postId: string): Promise<void> => {
    setIsSaved((prev) => !prev);
    await toggleSavePost(postId);
  };
  return (
    <>
      <button onClick={() => handleToggleSave(post.id)}>
        {isSaved ? <Saved /> : <Save />}
      </button>
    </>
  );
}
