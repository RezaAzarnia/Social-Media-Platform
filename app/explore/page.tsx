import React from "react";
import SearchInput from "../_Components/SearchInput";
import PostsList from "../_Components/PostsList";
import { search } from "../_lib/actions";
type Props = {
  searchParams: { query: string };
};
export default async function page({ searchParams }: Props) {
  const data = await search({
    searchValue: searchParams?.query,
    page: 1,
    limit: 6,
  });
  return (
    <div className="max-w-6xl col-span-2 px-16 py-12">
      <h1 className="mb-8 text-3xl font-bold capitalize">search posts</h1>
      <SearchInput />
      <div className="mt-16 ">
        <PostsList
          initialValues={data}
          fetchFunction={search}
          params={{ searchValue: searchParams?.query }}
        />
      </div>
    </div>
  );
}
