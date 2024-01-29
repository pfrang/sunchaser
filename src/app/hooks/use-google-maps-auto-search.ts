import useSWR from "swr";
import { fetcherFactory } from "app/utils/fetcher-factory";
import { gmapsAutoSearchUrl } from "app/api/google-maps/auto-search/route";

import { GoogleMapsAutoSearchGetResponse } from "../api/google-maps/auto-search/handler/handle-get";

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

  let { data, error, mutate } = useSWR<GoogleMapsAutoSearchGetResponse>(
    townSearch ? urlWithParams : null,
    townSearch ? () => fetcherFactory(fetcherRequest) : null,
  );

  const isLoading = !data && !error && townSearch;

  return { data, error, mutate, isLoading };
};
