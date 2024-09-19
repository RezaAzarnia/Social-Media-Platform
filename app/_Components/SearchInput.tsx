"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Search from "../_Icons/Search";
import { debounce } from "../utils/utils";

export default function SearchInput() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const deafultValue = searchParams.get("query") ?? ""
  const [searchValue, setSearchValue] = useState<string>(deafultValue);

  const handleSearch = debounce((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("query", value);
    router.replace(`${pathname.toString()}?${params.toString().toLowerCase()}`);
  }, 900);

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue]);
  return (
    <div className="flex">
      <button className="px-3 bg-dark-4 rounded-l-md">
        <Search />
      </button>
      <input
        className="w-full p-4 bg-dark-4 focus:outline-none rounded-r-md"
        placeholder="Search"
        value={searchValue ? searchValue : ""}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
      />
    </div>
  );
}
