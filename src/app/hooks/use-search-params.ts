"use client";
import { searchParamsToObject } from "app/utils/sanitize-next-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useSearchParamsToObject = () => {
  const searchParams = useSearchParams();

  return useMemo(() => searchParamsToObject(searchParams), [searchParams]);
};
