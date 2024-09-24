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
      <div className="flex-1 px-4 py-8 md:px-8 xl:px-16">
        <h1 className="mb-8 text-3xl font-bold capitalize">homes feed</h1>
        <MainPostList />
      </div>
      <aside
        className="overflow-auto xl:overflow-hidden sticky top-0 right-0 hidden h-screen p-8 space-y-4 text-center border-l lg:block border-dark-4 max-w-[250px] xl:max-w-[450px] flex-1
      [&::-webkit-scrollbar]:w-1
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:bg-light-purple
            "
      >
        <h3 className="text-2xl font-semibold">Top Creators</h3>
        <div className="grid grid-cols-1 grid-rows-3 gap-3 xl:grid-cols-2">
          <UsersList showFewer={true} />
        </div>
      </aside>
    </>
  );
}
