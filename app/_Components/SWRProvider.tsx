"use client";
import React from "react";
import { SWRConfig } from "swr";

export default function SWRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        fetcher: (...args: any) => fetch(args).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
}
