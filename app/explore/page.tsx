import React from "react";
import SearchInput from "../_Components/SearchInput";
import PostsList from "../_Components/PostsList";
import { getTopTrandsPosts, search } from "../_lib/actions";
type Props = {
  searchParams: { query: string };
};
export default async function page({ searchParams }: Props) {
  const searchResults = await search({
    searchValue: searchParams?.query,
    page: 1,
    limit: 6,
  });
  const topTrendsPosts = await getTopTrandsPosts({ page: 1, limit: 6 });
  return (
    <div className="max-w-6xl col-span-2 px-16 py-12">
      <h1 className="mb-8 text-3xl font-bold capitalize">search posts</h1>
      <SearchInput />
      <h1 className="mt-16 text-2xl font-bold capitalize">
        {searchParams?.query ? "Search Result" : "Popular Today" }
      </h1>
      <div className="mt-4 ">
        {searchParams.query ? (
          <PostsList
            initialValues={searchResults}
            fetchFunction={search}
            params={{ searchValue: searchParams?.query }}
          />
        ) : (
          <PostsList
            initialValues={topTrendsPosts}
            fetchFunction={getTopTrandsPosts}
            // isShowLike
          />
        )}
      </div>
    </div>
  );
}
