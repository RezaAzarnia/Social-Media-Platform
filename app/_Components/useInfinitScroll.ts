"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Post } from "../_types";
import useSWRInfinite from "swr/infinite";

type FecthParams = {
  page: number;
  limit: number;
  searchValue?: string;
  username?: string;
};

type Props = {
  fetchKey: string;
  fetchFunction: (
    params: FecthParams
  ) => Promise<{ posts: Post[]; postsCount: number }>;
  params?: { searchValue?: string; username?: string };
  limit?: number;
};

export default function useInfinitScroll({
  fetchKey,
  fetchFunction,
  params,
  limit = 6,
}: Props) {
  const { ref, inView } = useInView();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsCount, setPostCount] = useState<number>(0);

  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index) => [fetchKey, index + 1, limit],
    async ([_, page, limit]) => await fetchFunction({ ...params, page, limit })
  );

  useEffect(() => {
    if (data) {
      const newPosts = data.flatMap((item) => item?.posts || []); // Combine all posts from the data array
      setPosts(newPosts);
      setPostCount(data?.[0]?.postsCount);
    }
  }, [data]);

  useEffect(() => {
    if (inView && !(posts?.length >= postsCount)) {
      const newSizeValie = size + 1;
      setSize(() => newSizeValie);
    }
  }, [inView]);

  return {
    ref,
    posts,
    postsLength: postsCount,
    isLoading,
  };
}
