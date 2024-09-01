"use client";
import { toggleLikePost } from "../_lib/actions";
import React, { useState } from "react";
import Liked from "../_Icons/Liked";
import Like from "../_Icons/Like";
import { Post } from "../_types";

type Props = {
  post: Post;
};
export default function LikeButton({ post }: Props) {
  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked);
  const [likeCount, setLikeCount] = useState<number>(post._count.likes);

  const toggleLikeHandler = async (postId: string, mode: string) => {
    setIsLiked((prev) => !prev);

    mode === "like"
      ? setLikeCount((prev) => prev + 1)
      : setLikeCount((prev) => prev - 1);

    await toggleLikePost(postId);
  };
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={async () =>
          toggleLikeHandler(post?.id, isLiked ? "dislike" : "like")
        }
      >
        {isLiked ? <Liked /> : <Like />}
      </button>

      <span className="text-sm font-bold">{likeCount}</span>
    </div>
  );
}
