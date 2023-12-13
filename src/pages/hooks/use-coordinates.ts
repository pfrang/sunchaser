import { useRouter } from "next/router";

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
  requestConfig: Pick<NextApiRequest, "data" | "params" | "method">,
) => {
  const router = useRouter();

  const {
    data,
    error,
    isLoading,
  }: UseNextApiRequestResponse<CoordinatesNextApiResponse> = useNextApiRequest(
    {
      url: azureFuncGetCoordinatesEndPoint,
      params: requestConfig.params,
      method: requestConfig.method,
      data: requestConfig.data,
    },
    router.isReady && Boolean(router.query.lat && router.query.lon),
  );

  return { data, error, isLoading };
};
