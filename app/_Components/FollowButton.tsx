"use client";
import React, { useEffect, useState } from "react";
import { toggleFollow } from "../_lib/actions";
import { AuthenticatedUser } from "../_types";
import { useSWRConfig } from "swr";

interface Props {
  user: AuthenticatedUser;
}
export default function FollowButton({ user }: Props) {
  const [isFollowing, setIsFollowing] = useState<boolean>(user?.isFollowing!);
  const { mutate } = useSWRConfig();
  useEffect(() => {
    setIsFollowing(user?.isFollowing!);
  }, [user]);

  const handleFollowToggle = async (userId: string): Promise<void> => {
    setIsFollowing((prev) => !prev);
    await toggleFollow(userId);

    mutate((key: string) => key?.includes(`/api/users`));
  };

  return (
    <button
      className="w-full px-4 py-3 text-sm transition-all rounded-md bg-primary-600 hover:bg-primary-500 "
      onClick={() => handleFollowToggle(user?.id)}
    >
      {isFollowing ? "following" : "follow" }
    </button>
  );
}
