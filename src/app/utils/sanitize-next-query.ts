import { ReadonlyURLSearchParams } from "next/navigation";

export const sanitizeNextQuery = (queryParams: {
  [key: string]: string | string[] | undefined;
}) => {
  return Object.fromEntries(
    Object.entries(queryParams).map(([key, value]) => [
      key,
      value ? flattenString(value) : "",
    ]),
  );
};

export const searchParamsToObject = (
  searchParams: ReadonlyURLSearchParams | null,
) => {
  if (!searchParams) return null;
  return Object.fromEntries(
    Array.from(searchParams.entries()).map(([key, value]) => [
      key,
      value ? flattenString(value) : "",
    ]),
  );
};

export const flattenString = (str: string | string[]) =>
  Array.isArray(str) ? str.join(",").trim() : str.trim();

export const sanitizeNextParams = (params: Record<string, any>) => {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    )
    .join("&");
};
