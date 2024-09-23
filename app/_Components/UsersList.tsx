"use client";
import React, { memo, useEffect, useState } from "react";
import UserCard from "./UserCard";
import { ProfileType } from "../_types";
import useSWR from "swr";
import { getUsers } from "../_lib/actions";
import Spinner from "./Spinner";
type Props = {
  showFewer?: boolean;
};
function UsersList({ showFewer = false }: Props) {
  const { data, isLoading } = useSWR("/api/users", getUsers, {
    refreshWhenHidden: true,
  });
  const [users, setUsers] = useState<ProfileType[] | undefined>(data?.data);

  useEffect(() => {
    showFewer ? setUsers(data?.data?.slice(0, 6)) : setUsers(data?.data);
  }, [data, showFewer]);

  if (isLoading) return <Spinner />;

  return (
    <>
      {users &&
        users?.map((user: ProfileType) => {
          return <UserCard user={user} key={user.id} />;
        })}
    </>
  );
}
export default memo(UsersList);
