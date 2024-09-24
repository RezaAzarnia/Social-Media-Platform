import React from "react";
import CreatePostForm from "../_Components/CreatePostForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "SnappGram | Create Post",
  description:
    "Share your moments with the SnappGram community. Create a post to connect with friends and express yourself through photos and stories.",
  robots: { index: true, follow: true },

};

export default async function page() {
  return (
    <div className="flex-1 px-4 py-12 md:px-8 xl:px-16">
      <h1 className="mb-8 text-3xl font-bold capitalize">create post</h1>
      <div className="mt-16">
        <CreatePostForm  />
      </div>
    </div>
  );
}
