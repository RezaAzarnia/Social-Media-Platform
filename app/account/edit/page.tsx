import EditProfileForm from "@/app/_Components/EditProfileForm";
import { getMe } from "@/app/_lib/actions";


export default async function page() {
  const session = await getMe();

  return (
    <div className="col-span-2 py-14 px-16 max-w-6xl">
      <h1 className="text-3xl capitalize font-bold mb-8">edit profile</h1>
      <div className="mt-16">
        <EditProfileForm session={session} />
      </div>
    </div>
  );
}
