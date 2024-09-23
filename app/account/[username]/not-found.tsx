"use client";

import { useLayoutContext } from "@/app/_Components/LayoutProvider";
import UserNotFound from "@/app/_Icons/UserNotFound";
import { Metadata } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
export const metadata: Metadata = {
  title: "SnappGram | User Not Found",
  description:
    "The user you are looking for could not be found on SnappGram. Try going back to the homepage or search for another user.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const { setHideSidebar } = useLayoutContext();

  useEffect(() => {
    setHideSidebar(true);
    return () => setHideSidebar(false);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 col-span-2 m-auto w-full max-w-[700px] text-center">
      <UserNotFound />
      <h1 className="mt-6 text-4xl font-bold text-gray-400">User Not Found</h1>
      <Link
        href="/"
        className="px-8 py-4 mt-6 text-sm font-semibold text-white rounded-lg bg-primary-600 hover:bg-primary-500"
      >
        Go Back to Homepage
      </Link>
    </div>
  );
}
