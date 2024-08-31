import React, { Suspense } from "react";
import { getSinglePost } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import Image from "next/image";
import BackButton from "@/app/_Components/BackButton";
import LikeButton from "@/app/_Components/LikeButton";
import SaveButton from "@/app/_Components/SaveButton";
import Avatar from "@/app/_Components/Avatar";
import CardMenu from "@/app/_Components/CardMenu";
import PostPreviewCard from "@/app/_Components/PostPreviewCard";
import { Post } from "@/app/_types";
import { showCreatedTime } from "@/app/utils/utils";
type Props = {
  params: { postId: string };
};
export default async function page({ params: { postId } }: Props) {
  const { post, relatedPosts } = await getSinglePost(postId);
  const session = await auth();

  return (
    <div className="h-full max-w-6xl col-span-2 px-16 py-12">
      <div className="w-full">
        <BackButton />
        <div className="w-full  h-[400px] border border-dark-4 rounded-md flex gap-3 mt-10">
          <div className="relative w-1/2">
            <Image
              src={`http://localhost:3000/${post.imageUrl}`}
              alt={post.caption}
              fill
              className="h-full p-2 rounded-3xl"
            />
          </div>
          <div className="flex flex-col w-1/2 h-full p-8 rounded-md bg-dark-3">
            <div className="flex items-start justify-between">
              <Avatar user={post.creator}>
                <span className="text-xs text-light-3">
                  {showCreatedTime(post.createdAt)}. {post.location}
                </span>
              </Avatar>
              {post.creatorId === session?.userId && (
                <CardMenu postId={postId} />
              )}
            </div>

            <div className="h-full pt-4">
              <h3 className="block text-lg font-semibold line-clamp-1">
                {post.caption}
              </h3>
              <span className="text-xs text-light-3">
                <span className="text-xs text-light-3">
                  {post.hashtags.length > 0 &&
                    post.hashtags
                      .split(",")
                      .map((item: string, index: number) => {
                        return (
                          item.length > 0 && (
                            <span key={index + 1}>#{item.trim()} </span>
                          )
                        );
                      })}
                </span>
              </span>
            </div>

            <div className="flex justify-between mt-auto">
              <LikeButton post={post} />
              <SaveButton post={post} />
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold capitalize mt-28">
        most realated posts
      </h1>
      <div className="flex flex-wrap w-full gap-6 mt-8">
        {relatedPosts?.map((post: Post) => {
          return (
            <PostPreviewCard post={post} key={post.id} isShowLike={false} />
          );
        })}
      </div>
    </div>
  );
}
