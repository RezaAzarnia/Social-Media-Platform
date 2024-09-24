"use client";
import React, { useEffect, useMemo, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { Post } from "../_types";
import Image from "next/image";
import { showCreatedTime } from "../utils/utils";
import Avatar from "./Avatar";
import CardMenu from "./CardMenu";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import { getSinglePost } from "../_lib/actions";
import { useSession } from "next-auth/react";
import SinglePostInfoSkeleton from "./SinglePostInfoSkeleton";

type Props = {
  postId: string;
};
export default function SinglePostInfo({ postId }: Props) {
  const { cache } = useSWRConfig();
  //make a array from keys and get the cache from all and find the main post from there
  const cachedData = useMemo(() => {
    return Array.from(cache.keys())
      .filter((key) => key.includes("/api/post"))
      .map((key) => cache.get(key))
      .flatMap((item) => item?.data?.posts || [])
      .find((post: Post) => post?.id === postId);
  }, [cache, postId]);

  const {
    data: fetchedData,
    isLoading,
    error,
  } = useSWR(cachedData ? null : `api/post/singlePost/${postId}`, () =>
    getSinglePost(postId)
  );

  const { data: session } = useSession();
  const [postInfo, setPostInfo] = useState<Post>(cachedData);

  useEffect(() => {
    if (cachedData) {
      setPostInfo(cachedData);
      return;
    }
    fetchedData && setPostInfo(fetchedData?.post);
  }, [cachedData, fetchedData]);

  if (isLoading) {
    return <SinglePostInfoSkeleton />;
  }
  return (
    <>
      {postInfo && (
        <div className="flex flex-col w-full h-auto gap-3 mt-3 border rounded-md md:mt-10 border-dark-4 lg:flex-row">
          {/* Image section */}
          <div className="relative w-full h-80 lg:w-1/2 lg:h-[400px]">
            <Image
              src={process.env.NEXT_PUBLIC_PICTURE_URL + postInfo.imageUrl}
              alt={postInfo?.caption ?? "This is a post from snappgramm"}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover p-2 rounded-3xl"
            />
          </div>

          {/* Post content section */}
          <div className="flex flex-col w-full h-auto p-4 rounded-md lg:w-1/2 lg:p-8 bg-dark-3">
            <div className="flex items-start justify-between">
              <Avatar user={postInfo?.creator}>
                <span className="text-xs text-light-3">
                  {postInfo && showCreatedTime(postInfo?.createdAt)}.{" "}
                  {postInfo?.location}
                </span>
              </Avatar>
              {postInfo?.creatorId === session?.userId && (
                <CardMenu postId={postId} />
              )}
            </div>

            <div className="h-full py-4">
              <h3 className="block text-base font-semibold lg:text-lg line-clamp-1">
                {postInfo?.caption}
              </h3>
              <span className="text-xs text-light-3">
                {postInfo?.hashtags &&
                  postInfo?.hashtags
                    .split(",")
                    .map((item: string, index: number) => {
                      return (
                        item.length > 0 && (
                          <span key={item + index}>#{item.trim()} </span>
                        )
                      );
                    })}
              </span>
            </div>

            {/* Like and Save buttons */}
            <div className="flex justify-between mt-auto">
              <LikeButton post={postInfo} />
              <SaveButton post={postInfo} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
