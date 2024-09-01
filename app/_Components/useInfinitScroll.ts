"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
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
};

export default function useInfinitScroll({
  initialValues,
  fetchFunction,
  params,
  itemsCount,
}: Props) {
  const { ref, inView } = useInView();
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<Post[]>(initialValues?.posts);
  const postsCount:number = initialValues?.postsCount;
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (posts) {
      setIsLoading(false);
    }
  }, [posts]);

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
    if (inView) {
      getNewPosts();
    }
  }, [inView]);

  return {
    ref,
    posts,
    postsLength: postsCount,
    isLoading,
  };
}
