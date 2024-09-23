"use client";
import React, { memo } from "react";
import PostPreviewCard from "./PostPreviewCard";
import useInfinitScroll from "@/app/_Components/useInfinitScroll";
import SpinnerMini from "./SpinnerMini";
import { Post } from "../_types";
import PostPreviewskeleton from "./PostPreviewskeleton";

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
      <div className="flex flex-wrap h-full gap-6">
        {posts.length > 0
          ? posts?.map((post) => {
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
