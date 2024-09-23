import React from "react";
import UsersList from "./_Components/UsersList";
import MainPostList from "./_Components/MainPostList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SnappGram | Share Your Moments with Friends",
  description:
    "Join SnappGram, the ultimate social media platform by Reza Azarnia. Share photos, connect with friends, and explore trending content. Experience a vibrant community today!",
  robots: { index: true, follow: true },
};

export default async function page() {
  return (
    <>
      <div className="px-16 py-12">
        <h1 className="mb-8 text-3xl font-bold capitalize">homes feed</h1>
        <MainPostList />
      </div>
      <aside className="sticky top-0 right-0 w-full h-screen p-8 space-y-4 text-center border-l border-dark-4">
        <h3 className="text-2xl font-semibold">Top Creators</h3>
        <div className="grid grid-cols-2 grid-rows-3 gap-3">
          <UsersList showFewer={true} />
        </div>
      </aside>
    </>
  );
}
