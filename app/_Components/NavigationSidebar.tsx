import { memo } from "react";
import Logo from "@/app/_Icons/Logo";
import HomeIcon from "@/app/_Icons/HomeIcon";
import Link from "next/link";
import Gallery from "@/app/_Icons/Gallery";
import Wallpare from "@/app/_Icons/Wallpare";
import People from "@/app/_Icons/People";
import Save from "@/app/_Icons/Save";
import Logout from "@/app/_Icons/Logout";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Avatar from "./Avatar";

const listItems = [
  { icon: <HomeIcon />, href: "/", text: "Home" },
  { icon: <Wallpare />, href: "/explore", text: "Explore" },
  { icon: <People />, href: "/users", text: "People" },
  { icon: <Save />, href: "/saved", text: "Saved" },
  { icon: <Gallery />, href: "/createPost", text: "Create Post" },
];

function NavigationSidebar() {
  const pathname = usePathname();
  const { data: user } = useSession();
  return (
    <aside className="sticky top-0 flex flex-col w-64 h-screen p-4 space-y-8 bg-dark-3 ">
      <div className="w-40">
        <Logo />
      </div>

      {user && (
        <Avatar user={user}>
          <span className="text-xs text-light-3">@{user?.username}</span>
        </Avatar>
      )}

      <ul className="flex flex-col h-full gap-5">
        {listItems.map((item, index) => {
          return (
            <li
              className={`sidebar-list-item ${pathname === item.href && "active"}`}
              key={index + 1}
            >
              {item.icon}
              <Link href={item.href} className="w-full ">
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        className="mt-auto text-left sidebar-list-item"
        onClick={async () => {
          await signOut({ callbackUrl: "/login" });
        }}
      >
        <Logout />
        log out
      </button>
    </aside>
  );
}
export default memo(NavigationSidebar);
