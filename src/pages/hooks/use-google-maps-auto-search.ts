import useSWR from "swr";
import { fetcherFactory } from "pages/utils/fetcher-factory";

import { gmapsAutoSearchUrl } from "../api/google-maps/auto-search/index.endpoint";

import { NextApiRequest } from "./common-types";

export const useFetchGoogleMapsSearches = (townSearch: string) => {
  const urlWithParams = `${gmapsAutoSearchUrl}?input=${townSearch}`;

  const fetcherRequest: NextApiRequest = {
    url: gmapsAutoSearchUrl,
    params: { input: townSearch },
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let { data, error, mutate } = useSWR(
    townSearch ? urlWithParams : null,
    townSearch ? () => fetcherFactory(fetcherRequest) : null,
  );

  const isLoading = !data && !error && townSearch;

  return { data, error, isLoading };
};
