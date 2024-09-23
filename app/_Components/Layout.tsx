"use client";
import React from "react";
import { usePathname } from "next/navigation";
import NavigationSidebar from "./NavigationSidebar";
import { useLayoutContext } from "./LayoutProvider";

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  const pathname = usePathname();
  const { hideSidebar } = useLayoutContext();
  const authRoutes = ["/login", "/register"];
  return (
    <main className="flex w-full h-full min-h-screen text-white bg-dark-1">
      <div className="grid w-full">
        {authRoutes.includes(pathname) || hideSidebar ? (
          <>{children}</>
        ) : (
          <div className="grid grid-cols-[20%_50%_30%] justify-between">
            <NavigationSidebar />
            {children}
          </div>
        )}
      </div>
    </main>
  );
}
