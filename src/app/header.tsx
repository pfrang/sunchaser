"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { WhereAreYou } from "./components/_shared/where-are-you";
import { useSearchParamsToObject } from "./hooks/use-search-params";

export const Header = () => {
  const searchParams = useSearchParamsToObject();

  return (
    <div className="flex h-[68px]">
      <div className="flex h-full w-full justify-between px-2">
        <Link href={{ pathname: "/", query: searchParams }} tabIndex={0}>
          <Image
            width={56}
            height={56}
            // sizes="(max-width: 800px) 100px, 50px"
            // fill
            alt="Logo"
            src={"/logo.svg"}
          />
        </Link>


        <WhereAreYou />

      </div>
    </div>
  );
};
