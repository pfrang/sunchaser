import { azureFuncGlobalRankEndPoint } from "app/api/azure-function/global-rank/handlers/handle-post";
import { GlobalRankNextApiResponse } from "app/api/azure-function/global-rank/route";
import { fetcherFactory } from "app/utils/fetcher-factory";

type GlobalRankParams = {
  top: number;
  date?: string;
  group?: number;
};

export const fetchGlobalRank = async (
  params: GlobalRankParams,
): Promise<GlobalRankNextApiResponse> => {
  const response = await fetcherFactory({
    url: azureFuncGlobalRankEndPoint,
    method: "POST",
    data: params,
  });
  const data: GlobalRankNextApiResponse = response;

  return data;
};
