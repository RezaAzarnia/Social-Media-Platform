import NoContentMessage from "@/app/_Components/NoContentMessage";
import PostsList from "@/app/_Components/PostsList";
import UserProfile from "@/app/_Components/UserProfile";
import NoImage from "@/app/_Icons/NoImage";
import NoLike from "@/app/_Icons/NoLike";
import { getProfile, getUserActivity } from "@/app/_lib/actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
type Props = {
  params: {
    username: string;
  };
  searchParams: {
    query: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `SnappGram | ${params.username}`,
    description: `View the profile and posts of ${params.username}. Discover their moments, activities, and connect with them in the SnappGram community.`,
    robots: { index: true, follow: true },
  
  };
}

export default async function page({ params, searchParams }: Props) {
  const { username } = params;
  const { query } = searchParams;
  const { profile, status } = await getProfile(username);
  if (status === 404) notFound();
  //check if profile page is not logged in user profile page => show posts just
  const selectedActivity =
    profile.isCurrentUserProfile && query === "liked" ? "liked" : "userPosts";

  return (
    <div className="flex-1 px-4 py-10 md:px-8 xl:px-16">
      <UserProfile username={username} />

      <h1 className="mt-12 mb-8 text-3xl font-bold capitalize">
        {selectedActivity === "liked" ? "Liked Posts" : "all posts"}
      </h1>
      <div className="relative min-h-72">
        <PostsList
          fetchKey={`/api/post/${username}/createdPosts?${selectedActivity}`}
          fetchFunction={getUserActivity}
          params={{
            selectedActivity,
            username,
          }}
          noPostsMessage={
            <NoContentMessage
              icon={selectedActivity == "liked" ? <NoLike /> : <NoImage />}
              title={
                selectedActivity === "userPosts"
                  ? "no posted shared yet."
                  : "You haven't liked any posts yet."
              }
            />
          }
          isShowLike={false}
        />
      </div>
    </div>
  );
}
