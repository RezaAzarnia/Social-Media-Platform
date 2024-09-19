"use client";
import React, { useEffect, useState } from "react";
import { toggleSavePost } from "../_lib/actions";
import Saved from "../_Icons/Saved";
import Save from "../_Icons/Save";
import { Post } from "../_types";
import { useSWRConfig } from "swr";
type Props = {
  post: Post;
};

export default function SaveButton({ post }: Props) {
  const [isSaved, setIsSaved] = useState<boolean>(post?.isSaved);
  const { mutate } = useSWRConfig();
  useEffect(() => {
    setIsSaved(post?.isSaved);
  }, [post]);

  const handleSave = async (): Promise<void> => {
    setIsSaved((prev) => !prev);

    await toggleSavePost(post.id);

    mutate(
      (key: string) => key.includes("/api/post/savedPosts"),
      () => {},
      { revalidate: true }
    );
  };

  return (
    <>
      <button onClick={handleSave}>{isSaved ? <Saved /> : <Save />}</button>
    </>
  );
}
