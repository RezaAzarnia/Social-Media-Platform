import React from "react";

export default function PostPreviewskeleton() {
  return (
    <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => {
        return (
          <div
            className="relative flex flex-col w-full h-96 md:h-80 rounded-3xl bg-dark-4 animate-pulse"
            key={index + 1}
          >
            {/* Image Skeleton */}
            <div className="relative w-full h-full bg-dark-4 rounded-2xl"></div>
            {/* Bottom Content Skeleton */}
            <div className="absolute flex items-center justify-between w-full px-2 pb-1 mt-auto bottom-2">
              {/* Avatar Skeleton */}
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                <div className="flex flex-col space-y-1">
                  <div className="w-32 h-3 mb-1 bg-gray-700 rounded-md"></div>
                  <div className="w-16 h-3 bg-gray-700 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
