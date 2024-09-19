import React, { memo } from "react";
import UsersList from "../_Components/UsersList";

async function page() {
  return (
    <div className="col-span-2 py-12 px-16 max-w-6xl relative">
      <h1 className="text-3xl capitalize font-bold mb-8">all users</h1>
      <div className="grid grid-cols-3 auto-rows-[210px] gap-5">
        <UsersList  />
      </div>
    </div>
  );
}
export default memo(page);
