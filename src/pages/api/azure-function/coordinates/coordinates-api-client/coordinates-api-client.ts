import { AzureFunctionApiClient } from "../../api-client";

export class CoordinatesAPiClient extends AzureFunctionApiClient {
  readonly endpointUrl = `/WeatherResult`;
  readonly url = this.baseUrl + this.endpointUrl + this.key;

  post = async (body: any) => {
    const response = await this.axiosInstance.post(this.url, body);
    return { data: response.data };
  };
}
