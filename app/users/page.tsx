import React, { memo } from "react";
import UsersList from "../_Components/UsersList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SnappGram | All Users",
  description:
    "Explore all users on SnappGram, the vibrant social media platform by Reza Azarnia. Connect with friends and discover new profiles to follow.",
  robots: { index: true, follow: true },
};

async function page() {
  return (
    <div className="flex-1 px-4 py-12 md:px-8 xl:px-16">
      <h1 className="mb-8 text-3xl font-bold capitalize">all users</h1>
      <div className="grid auto-rows-[210px] gap-5 grid-cols-1  sm:grid-cols-2 xl:grid-cols-3">
        <UsersList />
      </div>
    </div>
  );
}
export default memo(page);
