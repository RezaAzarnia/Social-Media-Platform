import React from "react";
import SearchInput from "../_Components/SearchInput";
import { getTopTrandsPosts, search } from "../_lib/actions";
import PostsList from "../_Components/PostsList";
import { Metadata } from "next";
import NoContentMessage from "../_Components/NoContentMessage";
import SadFace from "../_Icons/SadFace";
type Props = {
  searchParams: { query: string };
};
export const metadata: Metadata = {
  title: "SnappGram | Explore",
  description:
    "Discover trending posts and connect with new content. Explore the vibrant SnappGram community and find moments that inspire you.",
  robots: { index: true, follow: true },
};

export default async function page({ searchParams }: Props) {
  const { query } = searchParams;
  return (
    <div className="flex-1 px-4 py-12 m-auto md:px-8 xl:px-16">
      <h1 className="mb-8 text-3xl font-bold capitalize">search posts</h1>
      <SearchInput />
      <h1 className="mt-8 text-2xl font-bold capitalize">
        {query ? "Search Result" : "Popular Today"}
      </h1>
      <div className="relative mt-4 min-h-72">
        {query ? (
          <PostsList
            fetchKey={query ? `/api/post/explore?searchValue=${query}` : null}
            fetchFunction={search}
            params={{ searchValue: query }}
            noPostsMessage={
              <NoContentMessage icon={<SadFace />} title="No Results Found" />
            }
          />
        ) : (
          <PostsList
            fetchKey="/api/post/topTrandes"
            fetchFunction={getTopTrandsPosts}
          />
        )}
      </div>
    </div>
  );
}
