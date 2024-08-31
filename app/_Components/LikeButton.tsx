"use client";
import { disLikePost, likePost } from "../_lib/actions";
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

    if (mode == "like") {
      setLikeCount((prev) => prev + 1);
      await likePost(postId);
    } else {
      setLikeCount((prev) => prev - 1);
      await disLikePost(postId);
    }
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
