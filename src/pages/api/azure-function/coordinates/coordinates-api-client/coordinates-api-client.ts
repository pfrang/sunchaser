import { AzureFunctionApiClient } from "../../api-client";

export class CoordinatesAPiClient extends AzureFunctionApiClient {
  readonly endpointUrl = `/HttpTrigger1`;
  readonly url = this.baseUrl + this.endpointUrl;

  post = async (input: any) => {
    try {
      const response = await this.axiosInstance.post(this.url, input);

      return { data: response.data };
    } catch (e) {
      return e;
    }
  };
}
