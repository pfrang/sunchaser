import axios, { AxiosInstance } from "axios";

export class NextApiClient {
  axiosInstance: AxiosInstance;
  constructor() {
    const axiosInstance = axios.create({
      headers: {
        "Access-Control-Allow-Origin": "*",
        "x-functions-key": "fjeiof"
      },
      baseURL: `${process.env.AZURE_FUNCTION_HOST}/api/HttpTrigger1`
    });
    this.axiosInstance = axiosInstance;
  }
}
