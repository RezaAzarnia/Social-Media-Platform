"use client";
import React, { useEffect } from "react";
import { useLayoutContext } from "./_Components/LayoutProvider";
import Link from "next/link";
import NotFoundIcon from "./_Icons/NotFoundIcon";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "SnappGram | Page Not Found",
  description:
    "The page you're looking for does not exist on SnappGram. Return to the homepage and continue browsing your favorite content.",
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
      <NotFoundIcon />

      <Link
        href="/"
        className="mt-6 px-8 py-4 text-sm font-semibold text-white bg-[#5f4495] hover:bg-[#5f4495ae] rounded-lg transition-colors"
      >
        Go Back to Homepage
      </Link>
    </div>
  );
}
