"use client";
import React, { useCallback, useState } from "react";
import { toggleFollow } from "../_lib/actions";
import { AuthenticatedUser } from "../_types";

interface Props {
  user: AuthenticatedUser;
}
export default function FollowButton({ user }: Props) {
  const [isFollowing, setIsFollowing] = useState<boolean>(user?.isFollowing!);

  const handleFollowToggle = useCallback(
    async (userId: string): Promise<void> => {
      setIsFollowing((prev) => !prev);
      await toggleFollow(userId);
    },
    []
  );
  return (
    <button
      className="px-4 py-2 text-sm transition-all rounded-md bg-primary-600 hover:bg-primary-500"
      onClick={() => handleFollowToggle(user?.id)}
    >
      {isFollowing ? "following" : "follow"}
    </button>
  );
}
