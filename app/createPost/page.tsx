import React from "react";
import CreatePostForm from "../_Components/CreatePostForm";

export default async function page() {
  return (
    <div className="col-span-2 py-12 px-16  max-w-6xl">
      <h1 className="text-3xl capitalize font-bold mb-8">create post</h1>
      <div className="mt-16">
        <CreatePostForm  />
      </div>
    </div>
  );
}
