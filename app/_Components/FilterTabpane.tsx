"use client";
import React from "react";
import Like from "../_Icons/Like";
import Gallery from "../_Icons/Gallery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FilterTabpane() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeQuery: string = searchParams.get("query") ?? "userPosts";

  const handleChangeUrl = (urlValue: string): void => {
    const params = new URLSearchParams(searchParams);
    params.set("query", urlValue);
    router.replace(`${pathname.toString()}?${params.toString()}`);
  };

  return (
    <div className="flex items-center w-1/3">
      <button
        className={`flex items-center justify-center w-1/2 gap-2 px-6 py-4 capitalize rounded-l-md ${activeQuery === "userPosts" ? "bg-dark-4" : "bg-dark-2"}`}
        onClick={() => handleChangeUrl("userPosts")}
      >
        <Gallery />
        Posts
      </button>
      <button
        onClick={() => handleChangeUrl("liked")}
        className={`flex items-center justify-center w-1/2 gap-2 px-6 py-4 capitalize rounded-r-md  ${activeQuery === "liked" ? "bg-dark-4" : "bg-dark-2"}`}
      >
        <Like />
        Likes posts
      </button>
    </div>
  );
}
