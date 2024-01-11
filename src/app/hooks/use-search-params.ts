"use client";
import { searchParamsToObject } from "app/utils/sanitize-next-query";
import { useSearchParams } from "next/navigation";

export const useSearchParamsToObject = () => {
  const searchParams = useSearchParams();

  return searchParamsToObject(searchParams);
};
