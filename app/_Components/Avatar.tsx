import Link from "next/link";
import React from "react";

type Props = {
  user: { name: string; username: string };
  isVertical?: boolean;
  isSmallAvatar?: boolean;
  children?: React.ReactNode;
};

export default function Avatar({
  user,
  isVertical,
  isSmallAvatar,
  children,
}: Props) {
  return (
    <Link href={`/account/${user?.username}`}>
      <div
        className={`flex items-center gap-2 ${isVertical && "flex-col  text-center"}`}
      >
        <div
          className={`${isSmallAvatar ? "w-10 h-10" : "w-12 h-12"} 
          flex flex-col items-center justify-center 
          rounded-full bg-blue-950`}
          style={{
            fontFamily: "Playwrite BE VLG",
          }}
        >
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col">
          <h4 className="text-xl font-semibold">{user?.name}</h4>
          {children}
        </div>
      </div>
    </Link>
  );
}
