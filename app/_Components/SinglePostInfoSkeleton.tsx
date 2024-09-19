import React from "react";

export default function SinglePostInfoSkeleton() {
  return (
    <div className="w-full h-[400px] border border-dark-4 rounded-md flex gap-3 mt-10 animate-pulse">
      <div className="w-1/2 h-full bg-dark-4 rounded-3xl"></div>
      <div className="flex flex-col w-1/2 h-full p-8 rounded-md bg-dark-3">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-full bg-dark-4"></div>
        </div>
        <div className="h-full pt-4">
          <div className="w-3/4 h-6 mb-2 rounded-md bg-dark-4"></div>
          <div className="w-full h-4 rounded-md bg-dark-4"></div>
        </div>
        <div className="flex justify-between mt-auto">
          <div className="w-10 h-10 rounded-md bg-dark-4"></div>
          <div className="w-10 h-10 rounded-md bg-dark-4"></div>
        </div>
      </div>
    </div>
  );
}
