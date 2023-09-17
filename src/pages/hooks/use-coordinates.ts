import axios, { AxiosRequestConfig } from "axios";
import useSWR from "swr";

import {
  CoordinatesNextApiResponse,
  azureFuncGetCoordinatesEndPoint,
} from "../api/azure-function/coordinates/index.endpoint";

import { useNextApiRequest } from "./use.next-api-request";
import { NextApiRequest } from "./common-types";

interface UseNextApiRequestResponse<Data> {
  data?: Data;
  error?: Error;
  isLoading: boolean;
}

export const useCoordinates = (
  requestConfig: Pick<NextApiRequest, "data" | "params">,
  isReady?: boolean
) => {
  const {
    data,
    error,
    isLoading,
  }: UseNextApiRequestResponse<CoordinatesNextApiResponse> = useNextApiRequest(
    {
      url: azureFuncGetCoordinatesEndPoint,
      params: requestConfig.params,
      data: requestConfig.data,
    },
    isReady
  );

  return { data, error, isLoading };
};
