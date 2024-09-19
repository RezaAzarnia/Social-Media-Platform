import Image from "next/image";
import React from "react";
import LikeButton from "./LikeButton";
import Link from "next/link";
import { Post } from "../_types";
import Avatar from "./Avatar";
type Props = {
  post: Post;
  isShowLike?: boolean;
};
export default function PostPreviewCard({ post, isShowLike = true }: Props) {
  return (
    <div className="relative flex flex-col w-full h-80 max-w-80 rounded-3xl">
      <Link href={`/post/${post.id}`} className="relative w-full h-full">
        <Image
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          src={"http://localhost:3000/" + post.imageUrl}
          alt={post.caption}
          className="rounded-2xl h-80"
          priority={true}
    
        />
      </Link>
      <div className="absolute flex items-center justify-between w-full px-2 pb-1 mt-auto bottom-2">
        <Avatar user={post?.creator} isSmallAvatar={true} />
        {isShowLike && (
          <div className="flex items-center gap-3">
            <LikeButton post={post} />
          </div>
        )}
      </div>
    </div>
  );
}
