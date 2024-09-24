import Link from "next/link";
import React from "react";
import { capitalizeFirstLetter } from "../utils/utils";

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
          className={`${isSmallAvatar ? "size-10" : "size-12"} 
         avatar
          `}
        >
          {capitalizeFirstLetter(user?.name)}
        </div>
        <div className="flex flex-col">
          <h4 className="text-xl font-semibold">{user?.name}</h4>
          {children}
        </div>
      </div>
    </Link>
  );
}
