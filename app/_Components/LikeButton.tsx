"use client";
import { likePostHandler } from "../_lib/actions";
import React, { useEffect, useState } from "react";
import Liked from "../_Icons/Liked";
import Like from "../_Icons/Like";
import { Post } from "../_types";
import { useSWRConfig } from "swr";

type Props = {
  post: Post;
};

export default function LikeButton({ post }: Props) {
  const [isLiked, setIsLiked] = useState<boolean>(post?.isLiked);
  const [likeCount, setLikeCount] = useState<number>(post?._count?.likes);
  const { mutate } = useSWRConfig();

  //update the like after component loaded
  useEffect(() => {
    setIsLiked(post?.isLiked);
    setLikeCount(post?._count?.likes);
  }, [post]);

  const toggleLikeHandler = async (postId: string, mode: string) => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (mode === "like" ? prev + 1 : prev - 1));
    mutate(
      (key: string[]) => key[0].startsWith("/api/post/"),
      (data: any) => {
        // console.log(data);
        return {
          ...data,
          posts: data.posts.map((p: Post) =>
            p.id === postId
              ? {
                  ...p,
                  isLiked: !p.isLiked,
                  _count: {
                    ...p._count,
                    likes:
                      mode === "like" ? p._count.likes + 1 : p._count.likes - 1,
                  },
                }
              : p
          ),
        };
      },
      { revalidate: false, rollbackOnError: true }
    );
    await likePostHandler(postId);
  };
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() =>
          toggleLikeHandler(post?.id, isLiked ? "dislike" : "like")
        }
      >
        {isLiked ? <Liked /> : <Like />}
      </button>

      <span className="text-sm font-bold">{likeCount}</span>
    </div>
  );
}
