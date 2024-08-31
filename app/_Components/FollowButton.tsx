"use client";
import React, { useCallback, useState } from "react";
import { followUser, unFollowUser } from "../_lib/actions";
import { NextResponse } from "next/server";
import { AuthenticatedUser } from "../_types";

interface Props {
  user: AuthenticatedUser;
}
export default function FollowButton({ user }: Props) {
  const [isFollowing, setIsFollowing] = useState<boolean>(user?.isFollowing!);
  const handleFollowToggle = useCallback(
    async (
      userId: string,
      toggleFunction: (userId: string) => Promise<NextResponse>
    ): Promise<void> => {
      setIsFollowing((prev) => !prev);
      await toggleFunction(userId);
    },
    []
  );
  return (
    <button
      className="px-4 py-2 text-sm transition-all rounded-md bg-primary-600 hover:bg-primary-500"
      onClick={() =>
        handleFollowToggle(user?.id, isFollowing ? unFollowUser : followUser)
      }
    >
      {isFollowing ? "following" : "follow"}
    </button>
  );
}
