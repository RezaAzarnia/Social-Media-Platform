import React, { memo } from "react";
import { AuthenticatedUser } from "../_types";
import FollowButton from "./FollowButton";
import Avatar from "./Avatar";
type Props = {
  user: AuthenticatedUser;
};
function UserCard({ user }: Props) {
  return (
    <div className="flex flex-col items-center w-full h-full row-span-1 gap-3 py-5 border-2 min-w-44 rounded-xl border-dark-4">
      <Avatar user={user} isVertical={true}>
        <span className="text-xs text-light-3">@{user?.username}</span>
      </Avatar>
      <FollowButton user={user} />
    </div>
  );
}
export default memo(UserCard);
