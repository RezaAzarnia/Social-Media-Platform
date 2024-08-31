"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { usePostContext } from "./PostContextProvider";
import { Post } from "../_types";

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
  params?: { searchValue?: string; username?: string };
  itemsCount?: number;
  useContext?: boolean;
};

export default function useInfinitScroll({
  initialValues,
  fetchFunction,
  params,
  itemsCount,
  useContext,
}: Props) {
  const { ref, inView } = useInView();
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<Post[]>(initialValues.posts);
  const postsCount: number = initialValues.postsCount;
  const [isLoading, setIsLoading] = useState(true);

  const contextValue = usePostContext();

  const getNewPosts = async () => {
    const nextPage = page + 1;
    const param = {
      ...params,
      page: nextPage,
      limit: itemsCount ?? 6,
    };

    const newPosts = await fetchFunction(param);

    if (newPosts) {
      setPosts([...posts, ...newPosts.posts]);
      setPage(nextPage);
    }
  };

  useEffect(() => {
    if (posts) {
      setIsLoading(false);
    }
    if (useContext) {
      contextValue.setPosts(posts);
      contextValue.setPostsLength(postsCount);
    }
  }, [posts]);

  useEffect(() => {
    if (inView) {
      getNewPosts();
    }
  }, [inView]);

  return {
    ref,
    posts: useContext ? contextValue.posts : posts,
    postsLength: useContext ? contextValue.postsLength : postsCount,
    isLoading,
  };
}
