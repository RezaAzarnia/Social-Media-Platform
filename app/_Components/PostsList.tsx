"use client";
import React, { memo } from "react";
import PostPreviewCard from "./PostPreviewCard";
import useInfinitScroll from "@/app/_Components/useInfinitScroll";
import SpinnerMini from "./SpinnerMini";
import PostPreviewskeleton from "./PostPreviewskeleton";
import { Post } from "../_types";

type Props = {
  fetchKey: string;

  fetchFunction: ({
    limit,
    page,
  }: {
    page: number;
    limit: number;
  }) => Promise<{ posts: Post[]; postsCount: number }>;
  noPostsMessage?: React.ReactNode;
  isShowLike?: boolean;
  params?: { postId?: string; searchValue?: string; username?: string ; selectedActivity?: string };
  limit?: number;
};

function PostsList({
  fetchFunction,
  fetchKey,
  limit,
  params,
  isShowLike,
  noPostsMessage,
}: Props) {
  const { ref, postsLength, posts, isLoading } = useInfinitScroll({
    fetchFunction,
    fetchKey,
    params,
    limit,
  });

  if (isLoading) {
    return <PostPreviewskeleton />;
  }
  return (
    <>
      <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.length > 0
          ? posts.map((post) => {
              return (
                <PostPreviewCard
                  post={post}
                  key={post.id}
                  isShowLike={isShowLike}
                />
              );
            })
          : noPostsMessage}

        {!isLoading && posts?.length !== postsLength && (
          <SpinnerMini ref={ref} />
        )}
      </div>
    </>
  );
}

export default memo(PostsList);
