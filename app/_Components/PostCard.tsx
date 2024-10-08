import Image from "next/image";
import Link from "next/link";
import Avatar from "./Avatar";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import { showCreatedTime } from "../utils/utils";
import { Post } from "@/app/_types";
type Props = {
  post: Post;
};
export default function PostCard({ post }: Props) {
  return (
    <div className="flex flex-col gap-3 p-4 mx-auto my-6 border md:p-6 bg-dark-2 rounded-3xl border-dark-4 ">
      <div className="flex items-center justify-between">
        <Avatar user={post.creator}>
          <span className="text-xs text-light-3">
            {showCreatedTime(post.createdAt)}. {post.location}
          </span>
        </Avatar>
      </div>
      <Link href={`/post/${post.id}`}>
        <div className="relative h-[300px] md:h-[400px] w-full">
          <Image
            src={process.env.NEXT_PUBLIC_PICTURE_URL + post.imageUrl}
            className="h-full mb-2 rounded-3xl"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            fill
            alt={post.caption}
            priority={true}
          />
        </div>
      </Link>
      <div>
        <Link
          href={`/post/${post.id}`}
          className="block text-xl font-semibold line-clamp-1"
        >
          {post.caption}
        </Link>

        <span className="text-xs text-light-3">
          {post.hashtags.length > 0 &&
            post.hashtags.split(",").map((item: string, index: number) => {
              return (
                item.length > 0 && <span key={index + 1}>#{item.trim()} </span>
              );
            })}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <LikeButton post={post} />
        <SaveButton post={post} />
      </div>
    </div>
  );
}
