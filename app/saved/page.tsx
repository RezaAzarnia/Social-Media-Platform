import React from "react";
import PostsList from "../_Components/PostsList";
import { getUserSavedPosts } from "../_lib/actions";
import { Metadata } from "next";
import Save from "../_Icons/Save";
import NoContentMessage from "../_Components/NoContentMessage";
import CircleSave from "../_Icons/CircleSave";

export const metadata: Metadata = {
  title: "SnappGram | Saved Posts",
  description:
    "View all your saved posts on SnappGram. Easily access your favorite content and never miss out on what you love.",
  robots: { index: true, follow: true },
};
export default async function Page() {
  return (
    <div className="flex-1 px-4 py-8 md:px-8 xl:px-16">
      <div className="flex items-baseline gap-2 ">
        <Save  />
        <h1 className="mb-8 text-3xl font-bold capitalize">saved</h1>
      </div>
      <div className="relative mt-4 min-h-72">
        <PostsList
          fetchKey={"/api/post/savedPosts"}
          fetchFunction={getUserSavedPosts}
          noPostsMessage={
            <NoContentMessage icon={<CircleSave />} title="No Saved Posts" />
          }
        />
      </div>
    </div>
  );
}
