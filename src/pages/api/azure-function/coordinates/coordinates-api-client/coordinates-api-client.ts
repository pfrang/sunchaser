import { AzureFunctionApiClient } from "../../api-client";

import { AzureFunctionCoordinatesData } from "./coordinates-api-response-schema";
import { AzureFunctionPostPayloadParams } from "./coordinates-api.post-schema";

export class CoordinatesAPiClient extends AzureFunctionApiClient {
  readonly endpointUrl = `/WeatherResult`;
  readonly url = "https://api-sunchaser.azurewebsites.net/api" + this.endpointUrl + "?code=5A4h1SN2OZAWm25Z8mnLhuQBt-uWfQJhWjozGNiywS_RAzFuT3dUsw=="


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
