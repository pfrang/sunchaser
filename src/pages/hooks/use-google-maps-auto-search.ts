import axios from "axios";
import useSWR from "swr";
import { Capacitor } from "@capacitor/core";

import {
  GoogleMapsAutoSearchNextApiResponse,
  gmapsAutoSearchUrl,
} from "../api/google-maps/auto-search/index.endpoint";

import { NextApiRequest } from "./common-types";

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
    townSearch ? () => fetcherFactory(fetcherRequest) : null,
  );

  const isLoading = !data && !error && townSearch;

  return { data, error, isLoading };
};

export const fetcherFactory = async (
  requestConfig: NextApiRequest,
): Promise<GoogleMapsAutoSearchNextApiResponse> => {
  const baseUrl = Capacitor.isNativePlatform()
    ? `https://sunchaser.vercel.app/api/`
    : `/api/`;

  const response = await axios({ ...requestConfig, baseURL: baseUrl });
  return response.data;
};
