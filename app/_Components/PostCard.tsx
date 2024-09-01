import Image from "next/image";
import Link from "next/link";
import Avatar from "./Avatar";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import { showCreatedTime } from "../utils/utils";
import { Post } from "@/app/_types";
type Props = {
  post: Post;
  userId: string;
};
export default function PostCard({ post, userId }: Props) {
  return (
    <div className="flex flex-col max-w-5xl gap-3 p-6 mx-auto my-6 border bg-dark-2 rounded-3xl border-dark-4 ">
      <div className="flex items-center justify-between">
        <Avatar user={post.creator}>
          <span className="text-xs text-light-3">
            {showCreatedTime(post.createdAt)}. {post.location}
          </span>
        </Avatar>
      </div>
      <Link href={`/post/${post.id}`}>
        <div className="relative h-[450px] max-h-[400px] w-full">
          <Image
            className="h-full mb-2 rounded-3xl"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            fill
            src={`http://localhost:3000${post?.imageUrl}`}
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
