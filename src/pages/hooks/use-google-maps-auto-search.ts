import axios, { AxiosRequestConfig } from "axios";
import useSWR from "swr";

import {
  GoogleMapsAutoSearchNextApiResponse,
  gmapsAutoSearchUrl,
} from "../api/google-maps/auto-search/index.endpoint";

interface NextApiRequest extends AxiosRequestConfig {}

export const useFetchGoogleMapsSearches = (townSearch: string) => {
  const urlWithParams = `${gmapsAutoSearchUrl}?input=${townSearch}`;

  const fetcherRequest = {
    url: gmapsAutoSearchUrl,
    params: { input: townSearch },
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let { data, error, mutate } = useSWR(
    townSearch ? urlWithParams : null,
    townSearch ? () => fetcherFactory(fetcherRequest) : null
  );

  const isLoading = !data && !error && townSearch;

  return { data, error, isLoading };
};

export const fetcherFactory = async (
  requestConfig: NextApiRequest
): Promise<GoogleMapsAutoSearchNextApiResponse> => {
  const response = await axios({ ...requestConfig, baseURL: "/api/" });
  return response.data;
};
