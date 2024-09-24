import React from "react";

export default function SinglePostInfoSkeleton() {
  return (
    <div className="flex flex-col w-full h-auto gap-3 mt-10 border rounded-md border-dark-4 lg:flex-row animate-pulse">
      {/* Image skeleton part */}
      <div className="w-full h-80 lg:w-1/2 lg:h-[400px] bg-dark-4 rounded-3xl"></div>
      
      {/* Post info skeleton part */}
      <div className="flex flex-col w-full h-auto p-4 rounded-md lg:w-1/2 lg:p-8 bg-dark-3">
        <div className="flex items-start justify-between">
          {/* Avatar skeleton */}
          <div className="rounded-full size-12 bg-dark-4"></div>
        </div>

        {/* Caption and hashtags skeleton */}
        <div className="h-full py-2">
          <div className="w-3/4 h-5 mb-2 rounded-md bg-dark-4"></div>
          <div className="w-full h-4 rounded-md bg-dark-4"></div>
        </div>

        {/* Like and Save button skeleton */}
        <div className="flex justify-between mt-auto">
          <div className="rounded-md size-6 bg-dark-4"></div>
          <div className="rounded-md size-6 bg-dark-4"></div>
        </div>
      </div>
    </div>
  );
}
