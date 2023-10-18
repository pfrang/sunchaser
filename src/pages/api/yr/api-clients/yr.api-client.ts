import { NextApiClient } from "pages/api/next-api.client";

export class YrApiClient extends NextApiClient {
  readonly url = "https://api.met.no/weatherapi/locationforecast/2.0/compact";

  async get({ longitude, latitude }: { longitude: string; latitude: string }) {
    try {
      const response = await this.axiosInstance.get(this.url, {
        params: {
          lon: longitude,
          lat: latitude,
        },
      });

      return { data: response.data };
    } catch (e) {
      throw e;
    }
  }
}
