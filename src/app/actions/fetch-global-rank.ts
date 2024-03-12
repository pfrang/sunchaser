"use server";

import { AppConfig } from "app-config";
import { azureFuncGlobalRankEndPoint } from "app/api/azure-function/global-rank/handlers/handle-post";
import { GlobalRankNextApiResponse } from "app/api/azure-function/global-rank/route";

type GlobalRankParams = {
  top: number;
  date?: string;
  group?: number;
};

export const fetchGlobalRank = async (
  params: GlobalRankParams,
): Promise<GlobalRankNextApiResponse> => {
  const host = new AppConfig().next.host;
  const response = await fetch(`${host}/api/${azureFuncGlobalRankEndPoint}`, {
    method: "POST",
    body: JSON.stringify({ ...params }),
  });
  const data = await response.json();

  return data;
};
