import { NextApiClient } from "../../next-api.client";

const yr = "https://api.met.no/weatherapi/locationforecast/2.0/compact";

interface Hei {
  hei: string;
}
export class CoordinatesAPiClient extends NextApiClient {
  constructor() {
    super()
  }

  async getCoordinates() {
    return await this.axiosInstance.get(`${yr}?lat=59&lon=58`)
  }
}
