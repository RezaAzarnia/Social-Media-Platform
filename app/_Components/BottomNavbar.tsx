import React from "react";
import HomeIcon from "@/app/_Icons/HomeIcon";
import Link from "next/link";
import Gallery from "@/app/_Icons/Gallery";
import Wallpare from "@/app/_Icons/Wallpare";
import People from "@/app/_Icons/People";
import Save from "@/app/_Icons/Save";
import { usePathname } from "next/navigation";

const listItems = [
  { icon: <HomeIcon />, href: "/", text: "Home" },
  { icon: <Wallpare />, href: "/explore", text: "Explore" },
  { icon: <Gallery />, href: "/createPost", text: "Create" },
  { icon: <Save />, href: "/saved", text: "Saved" },
  { icon: <People />, href: "/users", text: "People" },
];

export default function BottomNavbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full mt-2 md:hidden bg-dark-2">
      <ul className="flex justify-between px-4 py-2">
        {listItems.map((item, index) => {
          return (
            <Link href={item.href} key={index + 1}>
              <li
                className={`bottom-Navbar-item flex flex-col text-[12px] justify-between items-center gap-1 px-2 py-1 ${pathname === item.href && "active"}`}
              >
                {item.icon}
                {item.text}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
