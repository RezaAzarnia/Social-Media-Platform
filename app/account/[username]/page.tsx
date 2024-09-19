import PostsList from "@/app/_Components/PostsList";
import UserProfile from "@/app/_Components/UserProfile";
import { getUserActivity } from "@/app/_lib/actions";
type Props = {
  params: {
    username: string;
  };
  searchParams: {
    query: string;
  };
};
export default async function page({ params, searchParams }: Props) {
  const { username } = params;

  const searchValue = searchParams.query ?? "userPosts";

  return (
    <div className="max-w-6xl col-span-2 px-16 py-14">
      <UserProfile username={username} />
      <div className="relative mt-12">
        <PostsList
          fetchKey={`/api/post/${username}/createdPosts?${searchValue}`}
          fetchFunction={getUserActivity}
          params={{
            searchValue,
            username,
          }}
          isShowLike={false}
        />
      </div>
    </div>
  );
}
