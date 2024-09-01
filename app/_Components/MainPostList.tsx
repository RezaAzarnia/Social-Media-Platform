"use client";
import { useSession } from "next-auth/react";
import { getPosts } from "../_lib/actions";
import PostCard from "./PostCard";
import SpinnerMini from "./SpinnerMini";
import useInfinitScroll from "./useInfinitScroll";
import { Post } from "../_types";
import Spinner from "./Spinner";

type Props = {
  initialValues: { posts: Post[]; postsCount: number };
};
export default function MainPostList({ initialValues }: Props) {
  const { ref, postsLength, posts, isLoading } = useInfinitScroll({
    initialValues,
    fetchFunction: getPosts,
    itemsCount: 3,
  });
  const { data: user } = useSession();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        posts.length > 0 &&
        posts.map((post: Post) => {
          return (
            <PostCard
              post={post}
              key={post?.id}
              userId={user?.userId as string}
            />
          );
        })
      )}

      {!isLoading && !(posts.length >= postsLength) && (
        <SpinnerMini ref={ref} />
      )}
    </>
  );
}
