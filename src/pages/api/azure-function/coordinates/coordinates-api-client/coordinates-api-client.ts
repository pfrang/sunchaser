import { AzureFunctionApiClient } from "../../api-client";

import { AzureFunctionCoordinatesData } from "./coordinates-api-response-schema";
import { AzureFunctionPostPayloadParams } from "./coordinates-api.post-schema";

export class CoordinatesAPiClient extends AzureFunctionApiClient {
  readonly endpointUrl = `/WeatherResult`;
  readonly url = this.baseUrl + this.endpointUrl + this.key;

  post = async (body: AzureFunctionPostPayloadParams) => {
    try {
      const response =
        await this.axiosInstance.post<AzureFunctionCoordinatesData>(
          this.url,
          body,
        );

      return { data: response.data };
    } catch (e) {
      return { data: e };
    }
  };
}
