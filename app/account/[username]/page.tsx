import FilterTabpane from "@/app/_Components/FilterTabpane";
import FollowButton from "@/app/_Components/FollowButton";
import PostsList from "@/app/_Components/PostsList";
import Edit from "@/app/_Icons/Edit";
import { getProfile, getUserActivity } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { AuthenticatedUser, Post } from "@/app/_types";
import Link from "next/link";
type Props = {
  params: {
    username: string;
  };
  searchParams: {
    query: string;
  };
};
export default async function page({ params, searchParams }: Props) {
  const session = await auth();
  const { profile: userProfile } = await getProfile(
    params.username,
    session?.userId as string
  );
  const searchValue = searchParams.query ?? "userPosts";
  console.log(searchValue);
  const param = {
    searchValue,
    username: params.username,
  };

  const initialValue = await getUserActivity({
    searchValue,
    username: params.username,
    page: 1,
    limit: 6,
  });
  return (
    <div className="max-w-6xl col-span-2 px-16 py-14">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <ProfileAvatar userProfile={userProfile}>
            <FollowerFollowingsList userProfile={userProfile} />
          </ProfileAvatar>
        </div>
        {userProfile?.id === session?.userId ? (
          <Link
            href={"/account/edit"}
            className="flex items-center gap-1 px-6 py-3 text-sm capitalize rounded-md bg-dark-4"
          >
            <Edit />
            edit profile
          </Link>
        ) : (
          <FollowButton user={userProfile} />
        )}
      </div>

      {userProfile?.id === session?.userId && (
        <div className="mt-12">
          <FilterTabpane />
        </div>
      )}

      <div className="relative mt-12">
        <PostsList
          initialValues={initialValue}
          fetchFunction={getUserActivity}
          params={param}
        />
      </div>
    </div>
  );
}

const FollowerFollowingsList = ({
  userProfile,
}: {
  userProfile: Record<string, any>;
}) => {
  return (
    <ul className="flex items-center gap-3 mt-3">
      <li className="space-x-1">
        <span className="text-primary-500">{userProfile._count.posts}</span>
        <span>Posts</span>
      </li>
      <li className="space-x-1">
        <span className="text-primary-500">{userProfile.followers.length}</span>
        <span>Followers</span>
      </li>
      <li className="space-x-1">
        <span className="text-primary-500">{userProfile.following.length}</span>
        <span>Followings</span>
      </li>
    </ul>
  );
};
const ProfileAvatar = ({
  userProfile,
  children,
}: {
  userProfile: AuthenticatedUser;
  children: React.ReactNode;
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
          {userProfile.bio ? userProfile.bio : ""}
        </span>
        {children}
      </div>
    </>
  );
};
