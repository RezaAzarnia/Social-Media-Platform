"use client";
import React from "react";
import Back from "@/app/_Icons/Back";
import { useRouter } from "next/navigation";
export default function BackButton() {
  const router = useRouter();

  return (
    <button className="flex items-center gap-3" onClick={() => router.back()}>
      <Back />
      Back
    </button>
  );
}
