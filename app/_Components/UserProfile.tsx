"use client";
import React, { useEffect, useMemo, useState } from "react";
import FollowButton from "./FollowButton";
import FilterTabpane from "./FilterTabpane";
import Edit from "../_Icons/Edit";
import Link from "next/link";
import { ProfileType } from "../_types";
import useSWR, { useSWRConfig } from "swr";
import { getProfile, getUsers } from "../_lib/actions";
import ProfileSkeleton from "./ProfileSkeleton";

type Props = {
  username: string;
};

export default function UserProfile({ username }: Props) {
  const { cache } = useSWRConfig();
  const [profileInfo, setProfileInfo] = useState<ProfileType | null>(null);
  const { data: store } = useSWR("/api/users", getUsers, {
    fallbackData: cache.get("/api/users")?.data,
  });

  const cachedUser: ProfileType | undefined = useMemo(() => {
    return store?.data?.find((item: any) => item.username === username);
  }, [store, username]);


  const { data, isLoading } = useSWR(
    !cachedUser ? `/api/users/${username}` : null,
    () => getProfile(username),
    {
      fallbackData: cache?.get(`/api/users/${username}`)?.data,
    }
  );
  useEffect(() => {
    cachedUser ? setProfileInfo(cachedUser) : setProfileInfo(data?.profile);
  }, [cachedUser, data]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }
  return (
    <>
      {profileInfo && (
        <>
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <ProfileAvatar userProfile={profileInfo}>
                <FollowerFollowingsList
                  profileFollowers={profileInfo?._count}
                />
              </ProfileAvatar>
            </div>
            {profileInfo?.isCurrentUserProfile ? (
              <Link
                href={"/account/edit"}
                className="flex items-center gap-1 px-6 py-3 text-sm capitalize rounded-md bg-dark-4"
              >
                <Edit />
                edit profile
              </Link>
            ) : (
              <FollowButton user={profileInfo} />
            )}
          </div>

          {profileInfo?.isCurrentUserProfile && (
            <div className="mt-12">
              <FilterTabpane />
            </div>
          )}
        </>
      )}
    </>
  );
}

const FollowerFollowingsList = ({
  profileFollowers,
}: {
  profileFollowers: Record<string, number>;
}) => {
  return (
    <ul className="flex items-center gap-3 mt-3 [&>li]:space-x-1">
      {profileFollowers &&
        Object?.entries(profileFollowers)?.flatMap((item) => {
          return (
            <li key={item?.[0]}>
              <span className="text-primary-500">{item?.[1]}</span>
              <span>{item?.[0]}</span>
            </li>
          );
        })}
    </ul>
  );
};

const ProfileAvatar = ({
  userProfile,
  children,
}: {
  userProfile: ProfileType;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center text-4xl rounded-full bg-blue-950 w-28 h-28 "
        style={{ fontFamily: "Playwrite BE VLG" }}
      >
        {userProfile?.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-3xl font-semibold"> {userProfile?.name} </h4>
        <span className="text-md text-light-3">@{userProfile?.username}</span>
        <span className="italic text-md text-light-1">
          {userProfile?.bio ? userProfile?.bio : ""}
        </span>
        {children}
      </div>
    </>
  );
};
