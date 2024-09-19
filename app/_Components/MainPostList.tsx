"use client";
import PostCard from "./PostCard";
import SpinnerMini from "./SpinnerMini";
import useInfinitScroll from "./useInfinitScroll";
import { Post } from "../_types";
import { getAllPosts } from "../_lib/actions";
import { memo } from "react";
import PostCardSkeleton from "./PostCardSkeleton";

function MainPostList() {
  const { ref, postsLength, posts, isLoading } = useInfinitScroll({
    fetchKey: `/api/post/all`,
    fetchFunction: getAllPosts,
  });

  if (isLoading) return <PostCardSkeleton />;
  return (
    <>
      {posts?.length > 0 &&
        posts?.map((post: Post) => {
          return <PostCard post={post} key={post?.id} />;
        })}

      {!isLoading && posts?.length !== postsLength && <SpinnerMini ref={ref} />}
    </>
  );
}
export default memo(MainPostList);
