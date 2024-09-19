import React from "react";

export default function PostCardSkeleton() {
  return (
    <div className="flex flex-col max-w-5xl gap-3 p-6 mx-auto my-6 border bg-dark-2 rounded-3xl border-dark-4 animate-pulse">
      {/* Avatar and Post Information */}
      <div className="flex items-center justify-between">
        {/* Avatar Skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
          <div className="flex flex-col">
            <div className="w-24 h-4 mb-1 bg-gray-700 rounded-md"></div>
            <div className="w-16 h-3 bg-gray-700 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Image Skeleton */}
      <div className="relative h-[450px] max-h-[400px] w-full bg-gray-700 rounded-3xl"></div>

      {/* Post Caption Skeleton */}
      <div className="space-y-2">
        <div className="w-3/4 h-4 bg-gray-700 rounded-md"></div>
        <div className="w-1/2 h-3 bg-gray-700 rounded-md"></div>
      </div>

      {/* Buttons Skeleton */}
      <div className="flex items-center justify-between mt-2"></div>
    </div>
  );
}
