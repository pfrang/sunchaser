import { useRouter } from "next/router";
import { sanitizeNextQuery } from "pages/utils/sanitize-next-query";

export type UrlParams = {
  distance: number;
  lat: number;
  lon: number;
  date: string;
  location: string;
};
export const useUpdateUrl = () => {
  const router = useRouter();

  const updateUrl = (props: Partial<UrlParams>) => {
    const query = sanitizeNextQuery(router.query);

    router.push({
      query: {
        ...query,
        ...props,
      },
    });
  };

  return updateUrl;
};
