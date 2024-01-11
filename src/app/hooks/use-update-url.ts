import { sanitizeNextParams } from "app/utils/sanitize-next-query";
import { useRouter } from "next/navigation";

import { useSearchParamsToObject } from "./use-search-params";

export type UrlParams = {
  distance: number;
  lat: number;
  lon: number;
  date: string;
  location: string;
};

export const useUpdateUrl = () => {
  const searchParams = useSearchParamsToObject();
  const router = useRouter();

  const updateUrl = (props: Partial<UrlParams>) => {
    const params = {
      ...searchParams,
      ...props,
    };

    const paramsToString = sanitizeNextParams(params);

    router.push(`/${paramsToString}`);
  };

  return updateUrl;
};
