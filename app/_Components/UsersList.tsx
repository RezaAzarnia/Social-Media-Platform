import React, { memo, Suspense } from "react";
import UserCard from "./UserCard";
import Spinner from "./Spinner";
import { AuthenticatedUser } from "../_types";
type Props = {
  users: AuthenticatedUser[];
};
async function UsersList({ users }: Props) {
  return (
    <Suspense fallback={<Spinner />}>
      {users?.map((user) => {
        return <UserCard user={user} key={user.id} />;
      })}
    </Suspense>
  );
}
export default memo(UsersList);
