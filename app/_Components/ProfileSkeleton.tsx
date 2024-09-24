import React from "react";

export default function ProfileSkeleton() {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex flex-col items-center justify-center bg-gray-700 rounded-full animate-pulse w-28 h-28"></div>
          <div className="flex flex-col gap-3 mt-2">
            <div className="w-24 h-6 bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-16 h-4 bg-gray-700 rounded-md animate-pulse"></div>
            <div className="w-32 h-4 bg-gray-700 rounded-md animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded-md w-44 animate-pulse"></div>
          </div>
        </div>
        <div className="w-full h-10 bg-gray-700 rounded-md sm:w-20 animate-pulse"></div>
      </div>

      <div className="mt-12">
        <div className="w-full h-10 bg-gray-700 rounded-md lg:w-1/3 animate-pulse"></div>
      </div>
    </>
  );
}
