import useSWR from "swr";
import { fetcherFactory } from "app/utils/fetcher-factory";

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

  const result = useSWR(
    isReady ? urlWithParams : null,
    () => fetcherFactory(fetcherRequest),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  return result;
};
