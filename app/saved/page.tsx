import React from "react";
import PostsList from "../_Components/PostsList";
import { getUserSavedPosts } from "../_lib/actions";

export default async function Page() {
  return (
    <div className="max-w-6xl col-span-2 px-16 py-12">
      <h1 className="mb-8 text-3xl font-bold capitalize">saved</h1>

      <PostsList
        fetchKey={"/api/post/savedPosts"}
        fetchFunction={getUserSavedPosts}
        isShowLike={true}
      />
    </div>
  );
}
