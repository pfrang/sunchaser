import { AzureFunctionApiClient } from "../../api-client";

export class CoordinatesAPiClient extends AzureFunctionApiClient {
  readonly endpointUrl = `/HttpTrigger1`;
  readonly url =
    process.env.APP_ENV === "development"
      ? this.baseUrl + this.endpointUrl
      : this.baseUrl + this.endpointUrl + this.key;

  post = async (body: any) => {
    try {
      const response = await this.axiosInstance.post(this.url, body);
      return { data: response.data };
    } catch (e) {
      return e;
    }
  };
}
