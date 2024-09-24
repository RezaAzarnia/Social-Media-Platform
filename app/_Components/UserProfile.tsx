"use client";
import React, { useEffect, useMemo, useState } from "react";
import FollowButton from "./FollowButton";
import FilterTabpane from "./FilterTabpane";
import Edit from "../_Icons/Edit";
import Link from "next/link";
import { ProfileType } from "../_types";
import useSWR, { mutate, useSWRConfig } from "swr";
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
  //find the user from cache
  const cachedUser: ProfileType | undefined = useMemo(() => {
    return store?.data?.find((item: any) => item.username === username);
  }, [store, username]);

  // request for user info if user doesn't exist in cache
  const { data, isLoading } = useSWR(
    !cachedUser ? `/api/users/${username}` : null,
    async () => await getProfile(username)
  );

  useEffect(() => {
    if (cachedUser) {
      setProfileInfo(cachedUser);
      return;
    }
    data && setProfileInfo(data?.profile);
  }, [cachedUser, data]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }
  return (
    <>
      {profileInfo && (
        <>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <ProfileInfos userProfile={profileInfo} />
            {profileInfo?.isCurrentUserProfile ? (
              <Link
                href={"/account/edit"}
                className="flex items-center justify-center w-full gap-1 px-6 py-3 text-sm capitalize rounded-md bg-dark-4 sm:max-w-max"
              >
                <Edit />
                edit profile
              </Link>
            ) : (
              <div className="w-full md:w-24">
                <FollowButton user={profileInfo} />
              </div>
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

const ProfileInfos = ({ userProfile }: { userProfile: ProfileType }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* avatar part */}
      <div
        className="flex flex-col items-center justify-center text-4xl text-black rounded-full size-28 bg-light-purple "
        style={{ fontFamily: "Playwrite BE VLG" }}
      >
        {userProfile?.name?.charAt(0).toUpperCase()}
      </div>
      {/* profile user && username infos */}
      <div className="flex flex-col items-center gap-2 xxs:items-start">
        <h4 className="text-3xl font-semibold"> {userProfile?.name} </h4>
        <span className="text-md text-light-3">@{userProfile?.username}</span>
        {userProfile?.bio && (
          <span className="italic text-md text-light-1">
            {userProfile?.bio}
          </span>
        )}
        {/* follower and following infos */}
        <ul className="flex items-center gap-3 [&>li]:space-x-1">
          {userProfile._count &&
            Object?.entries(userProfile._count)?.flatMap((item) => {
              return (
                <li key={item?.[0]}>
                  <span className="text-primary-500">{item?.[1]}</span>
                  <span>{item?.[0]}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
