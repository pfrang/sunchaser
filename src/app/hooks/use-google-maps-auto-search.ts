import useSWR from "swr";
import { fetcherFactory } from "app/utils/fetcher-factory";
import { AxiosError } from "axios";

import {
  GoogleMapsAutoSearchGetResponse,
  gmapsAutoSearchUrl,
} from "../api/google-maps/auto-search/handler/handle-get";

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

  let { data, error, mutate } = useSWR<
    GoogleMapsAutoSearchGetResponse,
    AxiosError
  >(
    townSearch && townSearch !== "Min Lokasjon" ? urlWithParams : null,
    townSearch && townSearch !== "Min Lokasjon"
      ? () => fetcherFactory(fetcherRequest)
      : null,
  );

  const isLoading = !data && !error && Boolean(townSearch);

  return data
    ? { data, error, isLoading, mutate }
    : { error, mutate, isLoading };
};
