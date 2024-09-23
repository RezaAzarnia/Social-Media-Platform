import React from "react";
type Props = {
  icon?: React.ReactNode;
  title: string;
};
export default function NoContentMessage({ icon, title}: Props) {
  return (
    <div className="absolute flex flex-col items-center m-auto -translate-x-1/2 -translate-y-1/2 max-w-80 left-1/2 top-1/2">
      <div className="">{icon}</div>
      <h1 className="text-2xl font-semibold text-white capitalize text-center">{title}</h1>
    </div>
  );
}
