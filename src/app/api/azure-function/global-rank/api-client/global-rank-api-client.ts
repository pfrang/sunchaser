import { AzureFunctionApiClient } from "../../api-client";

import { AzureFunctionGlobalRankItem } from "./global-rank-api-response-schema";
import { AzureFunctionGlobalRankPayloadParams } from "./global-rank-api.post-schema";

export class GlobalRankApiClient extends AzureFunctionApiClient {
  readonly endpointUrl = `/GlobalRank`;
  readonly url = this.baseUrl + this.endpointUrl + this.key;

  post = async (body: AzureFunctionGlobalRankPayloadParams) => {
    const response = await this.axiosInstance.post<
      AzureFunctionGlobalRankItem[]
    >(this.url, body);

    return { data: response.data };
  };
}
