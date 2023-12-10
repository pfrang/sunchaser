import axios from "axios";
import useSWR, { SWRConfig } from "swr";
import { Capacitor } from "@capacitor/core";

import { NextApiRequest } from "./common-types";

export interface UseNextApiRequestResponse<Data> {
  data?: Data;
  error?: Error;
  isLoading: boolean;
}

export const useNextApiRequest = (
  requestConfig: Pick<NextApiRequest, "data" | "params" | "url" | "method">,
  isReady?: boolean,
) => {
  const params = requestConfig.params
    ? Object.entries(requestConfig.params)
    : [];

  const urlWithParams = `${requestConfig.url}${
    params.length > 0 ? "?" : ""
  }${params}`;

  const fetcherRequest = {
    ...requestConfig,
    url: urlWithParams,
    method: requestConfig.method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let { data, error, mutate } = useSWR(
    isReady ? urlWithParams : null,
    isReady ? () => fetcherFactory(fetcherRequest) : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  const isLoading = !data && !error;

  return { data, isLoading, error, mutate };
};

export const fetcherFactory = async (requestConfig: NextApiRequest) => {
  const baseUrl = !Capacitor.isNativePlatform()
    ? `https://sunchaser.vercel.app/api/`
    : `/api/`;

  const response = await axios({ ...requestConfig, baseURL: baseUrl });
  return response.data;
};
