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
    <div className="max-w-6xl col-span-2 px-16 py-12 ">
      <div className="flex items-baseline gap-2 ">
        <Save width={25} height={25} />
        <h1 className="mb-8 text-3xl font-bold capitalize">saved</h1>
      </div>
      <div className="relative mt-16 min-h-72">
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
