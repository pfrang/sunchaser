import { CoordinatesNextApiResponse } from "app/api/azure-function/coordinates/route";
import { azureFuncGetCoordinatesEndPoint } from "app/api/azure-function/coordinates/handler/handle-post";
import { AxiosError } from "axios";

import { useNextApiRequest } from "./use.next-api-request";
import { NextApiRequest } from "./common-types";
import { useSearchParamsToObject } from "./use-search-params";

export const useCoordinates = (
  requestConfig: Pick<NextApiRequest, "data" | "params" | "method">,
) => {
  const searchParams = useSearchParamsToObject();

  const { data, error, isLoading } = useNextApiRequest<
    CoordinatesNextApiResponse,
    AxiosError
  >(
    {
      url: azureFuncGetCoordinatesEndPoint,
      params: requestConfig.params,
      method: requestConfig.method,
      data: requestConfig.data,
    },
    Boolean(searchParams?.lat && searchParams?.lon),
  );

  return { data, error, isLoading };
};
