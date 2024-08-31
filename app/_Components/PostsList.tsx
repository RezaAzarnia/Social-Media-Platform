"use client";
import React, { memo, useEffect } from "react";
import PostPreviewCard from "./PostPreviewCard";
import useInfinitScroll from "@/app/_Components/useInfinitScroll";
import SpinnerMini from "./SpinnerMini";
import { Post } from "../_types";
import Spinner from "./Spinner";
type FecthParams = {
  page: number;
  limit: number;
  searchValue?: string;
  username?: string;
};
type Props = {
  initialValues: { posts: Post[]; postsCount: number };
  fetchFunction: (
    params: FecthParams
  ) => Promise<{ posts: Post[]; postsCount: number }>;

  isShowLike?: boolean;
  render?: React.ReactNode;
  params?: { searchValue?: string; username?: string };
  itemsCount?: number;
};

function PostsList({
  initialValues,
  fetchFunction,
  isShowLike,
  params,
  itemsCount,
  render,
}: Props) {
  const { ref, postsLength, posts, isLoading } = useInfinitScroll({
    initialValues,
    fetchFunction,
    params,
    itemsCount,
  });


  return (
    <>
      <div className="flex flex-wrap gap-6">
        {isLoading ? (
          <Spinner />
        ) : posts.length > 0 ? (
          posts.map((post: Post) => {
            return (
              <PostPreviewCard
                post={post}
                isShowLike={isShowLike ? isShowLike : false}
                key={post.id}
              />
            );
          })
        ) : (
          render
        )}
        {!isLoading && !(posts.length >= postsLength) && (
          <SpinnerMini ref={ref} />
        )}
      </div>
    </>
  );
}

export default memo(PostsList);
