import React from "react";
import BackButton from "@/app/_Components/BackButton";
import SinglePostInfo from "@/app/_Components/SinglePostInfo";
import PostsList from "@/app/_Components/PostsList";
import { getRelatedPosts } from "@/app/_lib/actions";
type Props = {
  params: { postId: string };
};
export default async function page({ params: { postId } }: Props) {
  return (
    <div className="h-full max-w-6xl col-span-2 px-16 py-12">
      <div className="w-full">
        <BackButton />
        <SinglePostInfo postId={postId} />
      </div>
      
      <h1 className="mb-6 text-2xl font-bold capitalize mt-28">
        most realated posts
      </h1>

      <PostsList
        fetchKey={`/api/post/relatedPosts/${postId}`}
        fetchFunction={getRelatedPosts}
        params={{
          postId,
        }}
      />
    </div>
  );
}
