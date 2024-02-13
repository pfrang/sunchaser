"use server";

import { azureFuncGlobalRankEndPoint } from "app/api/azure-function/global-rank/handlers/handle-post";
import { GlobalRankNextApiResponse } from "app/api/azure-function/global-rank/route";

export const fetchGlobalRank = async (
  top: number,
  date?: string,
): Promise<GlobalRankNextApiResponse> => {
  const response = await fetch(
    `http://localhost:3000/api/${azureFuncGlobalRankEndPoint}`,
    {
      method: "POST",
      body: JSON.stringify({ top, date }),
    },
  );
  const data = await response.json();

  return data;
};
