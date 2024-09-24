"use client";
import React from "react";
import Logo from "../_Icons/Logo";
import Logout from "../_Icons/Logout";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { capitalizeFirstLetter } from "../utils/utils";
import Link from "next/link";

export default function Topbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <nav
      className={`sticky top-0 z-50 w-full md:hidden bg-dark-2 ${pathname.startsWith("/account") ? "hidden" : "block"}`}
    >
      <div className="flex justify-between px-4 py-2">
        <div className="w-32">
          <Logo />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              await signOut({ callbackUrl: "/login" });
            }}
          >
            <Logout />
          </button>

          {session && (
            <Link href={`/account/${session.username}`} className="size-9 avatar">
              {capitalizeFirstLetter(session.name)}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
