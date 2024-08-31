import React from "react";
import { getPosts, getUsers } from "./_lib/actions";
import MainPostList from "./_Components/MainPostList";
import UsersList from "./_Components/UsersList";


export default async function Page() {
  const [posts, users] = await Promise.all([
    getPosts({ page: 1, limit: 3 }),
    getUsers(),
  ]);
  return (
    <>
      <div className="px-16 py-12">
        <h1 className="mb-8 text-3xl font-bold capitalize">homes feed</h1>
    
        <MainPostList initialValues={posts}/>
      </div>
      <aside className="sticky top-0 right-0 w-full h-screen p-8 space-y-4 border-l border-dark-4 ">
        <h3 className="text-2xl font-semibold">Top Creators</h3>
        <div className="grid grid-cols-2 grid-rows-3 gap-3">
          <UsersList users={users?.data} />
        </div>
      </aside>
    </>
  );
}
