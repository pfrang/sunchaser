import { NextApiClient } from "../../../next-api.client";

const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=ambo&key=${process.env.GOOGLE_API_KEY}`;

export class GMAPSAutoSearchApiClient extends NextApiClient {
  constructor() {
    super()
  }

  async getCoordinates(input) {
    return await this.axiosInstance.get(`${url}?input${input}`)
  }
}
