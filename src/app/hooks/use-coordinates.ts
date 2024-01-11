import { CoordinatesNextApiResponse } from "app/api/azure-function/coordinates/route";
import { azureFuncGetCoordinatesEndPoint } from "app/api/azure-function/coordinates/handler/handle-post";

import { useNextApiRequest } from "./use.next-api-request";
import { NextApiRequest } from "./common-types";
import { useSearchParamsToObject } from "./use-search-params";

interface UseNextApiRequestResponse<Data> {
  data?: Data;
  error?: Error;
  isLoading: boolean;
}

export const useCoordinates = (
  requestConfig: Pick<NextApiRequest, "data" | "params" | "method">,
) => {
  const searchParams = useSearchParamsToObject();

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
    Boolean(searchParams.lat && searchParams.lon),
  );

  return { data, error, isLoading };
};
