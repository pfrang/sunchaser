import { azureFuncGlobalRankEndPoint } from "app/api/azure-function/global-rank/handlers/handle-post";
import { GlobalRankNextApiResponse } from "app/api/azure-function/global-rank/route";
import { AxiosError } from "axios";
import { GlobalRankPayloadParams } from "app/api/azure-function/global-rank/handlers/post-payload.schema";

import { useNextApiRequest } from "./use.next-api-request";
import { useSearchParamsToObject } from "./use-search-params";

export const useGlobalRank = (payload: GlobalRankPayloadParams) => {
  const searchParams = useSearchParamsToObject();

  const { data, error, isLoading } = useNextApiRequest<
    GlobalRankNextApiResponse,
    AxiosError
  >(
    {
      url: azureFuncGlobalRankEndPoint,
      method: "POST",
      data: payload,
    },
    Boolean(searchParams?.date),
  );

  return data
    ? {
        data,
        error,
        isLoading,
      }
    : { error, isLoading };
};
