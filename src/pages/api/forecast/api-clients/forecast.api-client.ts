import { NextApiClient } from "pages/api/next-api.client";

import { YrData } from "./forecast.api-response-schema";

export class YrApiClient extends NextApiClient {
  readonly url = "https://api.met.no/weatherapi/locationforecast/2.0/compact";

  async get({ lon, lat }: { lon: string; lat: string }) {
    try {
      const response = await this.axiosInstance.get<YrData>(this.url, {
        params: {
          lon,
          lat,
        },
      });

      return { data: response.data };
    } catch (e) {
      throw e;
    }
  }
}
