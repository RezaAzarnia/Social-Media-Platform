import React from "react";
import BackButton from "@/app/_Components/BackButton";
import SinglePostInfo from "@/app/_Components/SinglePostInfo";
import PostsList from "@/app/_Components/PostsList";
import { getRelatedPosts, getSinglePost } from "@/app/_lib/actions";
import { Metadata } from "next";
import NoContentMessage from "@/app/_Components/NoContentMessage";
import NoImage from "@/app/_Icons/NoImage";
type Props = {
  params: { postId: string };
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postId } = params;
  const post = await getSinglePost(postId);

  return {
    title: `SnappGram | ${post.post.caption}`,
    description: post.post.caption + "Check out this post on SnappGram.",
    robots: { index: true, follow: true },
  };
}

export default async function page({ params: { postId } }: Props) {
  return (
    <div className="flex-1 px-4 py-10 md:px-8 xl:px-16">
      <div className="w-full">
        <BackButton />
        <SinglePostInfo postId={postId} />
      </div>

      <h1 className="mt-12 mb-6 text-2xl font-bold capitalize lg:mt-28">
        most realated posts
      </h1>
      <div className="relative min-h-80">
        <PostsList
          fetchKey={`/api/post/relatedPosts/${postId}`}
          fetchFunction={getRelatedPosts}
          params={{
            postId,
          }}
          noPostsMessage={
            <NoContentMessage icon={<NoImage />} title={"no related post"} />
          }
        />
      </div>
    </div>
  );
}
