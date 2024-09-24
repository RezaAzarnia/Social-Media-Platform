import EditProfileForm from "@/app/_Components/EditProfileForm";
import { getMe } from "@/app/_lib/actions";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "SnappGram | Edit Profile",
  description:
    "Update your SnappGram profile. Edit your personal information, change your profile picture, and customize your account to better express yourself.",
  robots: { index: true, follow: true },
};

export default async function page() {
  const session = await getMe();

  return (
    <div className="flex-1 px-4 py-12 md:px-8 xl:px-16">
      <h1 className="mb-8 text-3xl font-bold capitalize">edit profile</h1>
      <div className="mt-16">
        <EditProfileForm session={session} />
      </div>
    </div>
  );
}
