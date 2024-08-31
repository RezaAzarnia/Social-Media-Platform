"use client";
import React, { useState } from "react";
import { savePost, unSavePost } from "../_lib/actions";
import { NextResponse } from "next/server";
import Saved from "../_Icons/Saved";
import Save from "../_Icons/Save";
import { Post } from "../_types";

type Props = {
  post: Post;
};
export default function SaveButton({ post }: Props) {
  const [isSaved, setIsSaved] = useState<boolean>(post.isSaved);
  const handleToggleSave = async (
    postId: string,
    toggleFunction: (postId: string) => Promise<NextResponse>
  ): Promise<void> => {
    setIsSaved((prev) => !prev);

    await toggleFunction(postId);
    
  };
  return (
    <>
      <button
        onClick={async () =>
          handleToggleSave(post.id, isSaved ? unSavePost : savePost)
        }
      >
        {isSaved ? <Saved /> : <Save />}
      </button>
    </>
  );
}
