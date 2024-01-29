import { NextApiClient } from "../../../next-api.client";

import { GetGoogleMapsAutoSearchSLApiResponse } from "./gmaps-sl-api-response-schema";

export class GoogleMapsAutoSearchApiClient extends NextApiClient {
  readonly baseUrl =
    "https://maps.googleapis.com/maps/api/place/autocomplete/json";
  readonly locations = ["no"];
  readonly apiKey = process.env.GOOGLE_API_KEY;

  get = async (input: string) => {
    const components = this.locations
      .map((location) => `country:${location}`)
      .join("|");

    const url = `${this.baseUrl}?key=${this.apiKey}&components=${components}`;

    const params = {
      input: input,
    };

    const response =
      await this.axiosInstance.get<GetGoogleMapsAutoSearchSLApiResponse>(url, {
        params,
      });

    return response.data;
  };
}
