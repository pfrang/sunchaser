import { NextApiClient } from "../../../next-api.client";

import { GetGoogleMapsDetailsSLApiResponse } from "./gmaps-sl-api-response-schema";

const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${process.env.GOOGLE_API_KEY}`;

export class GoogleMapsDetailsApiClient extends NextApiClient {
  readonly url = url;

  get = async (
    input: string
  ): Promise<{ data: GetGoogleMapsDetailsSLApiResponse }> => {
    const params = {
      place_id: input,
    };

    const response =
      await this.axiosInstance.get<GetGoogleMapsDetailsSLApiResponse>(
        this.url,
        {
          params,
        }
      );

    return { data: response.data };
  };
}
