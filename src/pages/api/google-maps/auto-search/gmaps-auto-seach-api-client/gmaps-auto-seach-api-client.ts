import { NextApiClient } from "../../../next-api.client";
import { GetGoogleMapsAutoSearchSLApiResponse } from "./gmaps-sl-api-response-schema";

const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${process.env.GOOGLE_API_KEY}`;

export class GoogleMapsAutoSearchApiClient extends NextApiClient {

  readonly url = url

  get = async (input: string): Promise<{ data: GetGoogleMapsAutoSearchSLApiResponse }> => {
    const params = {
      input: input
    }

    const response = await this.axiosInstance.get<GetGoogleMapsAutoSearchSLApiResponse>(
      this.url,
      {
        params
      }
    );

    return { data: response.data }
  }
}
