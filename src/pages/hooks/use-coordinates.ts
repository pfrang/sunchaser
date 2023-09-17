import axios, { AxiosRequestConfig } from "axios";
import useSWR from "swr";

import { azureFuncGetCoordinatesEndPoint } from "../api/azure-function/coordinates/index.endpoint";

import { useNextApiRequest } from "./use.next-api-request";

interface NextApiRequest extends AxiosRequestConfig {}

export const useCoordinates = (
  requestConfig: Pick<NextApiRequest, "data" | "params">,
  isReady?: boolean
) => {
  const { data, error, isLoading } = useNextApiRequest(
    {
      url: azureFuncGetCoordinatesEndPoint,
      params: requestConfig.params,
      data: requestConfig.data,
    },
    isReady
  );

  return { data, error, isLoading };
};
