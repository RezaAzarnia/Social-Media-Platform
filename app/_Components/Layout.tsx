"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavigationSidebar from "./NavigationSidebar";
import { useLayoutContext } from "./LayoutProvider";
import BottomNavbar from "./BottomNavbar";
import Topbar from "./Topbar";

type Props = {
  children: React.ReactNode;
};

const isMobileScreen = () => {
  if (typeof window === "undefined") {
    return false; 
  }
  return window.innerWidth < 768;
};

export default function Layout({ children }: Props) {
  const pathname = usePathname();
  const [isMobileVersion, setIsMobileVersion] = useState<boolean>(false);
  const handleResize = () => {
    setIsMobileVersion(isMobileScreen);
  };
  useEffect(() => {
    //pass the window size in first load
    setIsMobileVersion(isMobileScreen);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { hideSidebar } = useLayoutContext();
  const authRoutes = ["/login", "/register"];
  return (
    <main className="flex w-full h-full min-h-screen text-white bg-dark-1">
      <div className="size-full">
        {authRoutes.includes(pathname) || hideSidebar ? (
          <div className="flex">{children}</div>
        ) : (
          <div className="flex flex-wrap justify-between mb-6 md:mb-0">
            {/* handle with condition because of the logo problem */}
            { isMobileVersion ? <Topbar /> : <NavigationSidebar />}
            {children}
            <BottomNavbar />
          </div>
        )}
      </div>
    </main>
  );
}
