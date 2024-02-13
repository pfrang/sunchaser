import { HandleEndpoint } from "../../../handle-endpoint";
import { GlobalRankApiClient } from "../api-client/global-rank-api-client";
import { AzureFunctionGlobalRankPayloadParams } from "../api-client/global-rank-api.post-schema";

import { GlobalRankPayloadParams } from "./post-payload.schema";

export const azureFuncGlobalRankEndPoint = "azure-function/global-rank";

export const handlePost = async (req: Request) =>
  await HandleEndpoint.Open(async () => {
    const body = await req.json();

    if (!isBodyValid(body))
      throw new Error("Body didnt have the necessary schema");

    const payLoad: AzureFunctionGlobalRankPayloadParams = {
      params: {
        ...body,
      },
    };

    const response = await new GlobalRankApiClient().post(payLoad);

    return response.data;
  });

const isBodyValid = (
  body: any | GlobalRankPayloadParams,
): body is GlobalRankPayloadParams => {
  return (body as GlobalRankPayloadParams).top !== undefined;
};
