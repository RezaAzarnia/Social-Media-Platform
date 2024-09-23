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
    <div className="relative max-w-6xl col-span-2 px-16 py-12">
      <h1 className="mb-8 text-3xl font-bold capitalize">all users</h1>
      <div className="grid grid-cols-3 auto-rows-[210px] gap-5">
        <UsersList />
      </div>
    </div>
  );
}
export default memo(page);
