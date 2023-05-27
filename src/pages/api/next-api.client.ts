import axios, { AxiosInstance } from "axios";

const yr = "https://api.met.no/weatherapi/locationforecast/2.0/compact";

export type ResponseDTO<Data> = {
  metadata: ResponseMetaData;
} & Data;

type ResponseMetaData = Record<string, unknown>;

export class NextApiClient {
  axiosInstance: AxiosInstance;
  constructor() {
    const axiosInstance = axios.create({
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    this.axiosInstance = axiosInstance;
  }
}
