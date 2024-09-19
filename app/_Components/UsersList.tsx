"use client";
import React, { memo } from "react";
import UserCard from "./UserCard";
import { ProfileType } from "../_types";
import useSWR from "swr";
import { getUsers } from "../_lib/actions";
import Spinner from "./Spinner";

function UsersList() {
  const { data: users, isLoading } = useSWR("/api/users", getUsers, {
    refreshWhenHidden: true,
  });
  if (isLoading) return <Spinner />;
  return (
    <>
      {users?.data.map((user: ProfileType) => {
        return <UserCard user={user} key={user.id} />;
      })}
    </>
  );
}
export default memo(UsersList);
