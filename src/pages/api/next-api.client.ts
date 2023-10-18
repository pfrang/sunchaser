import axios, { AxiosError, AxiosInstance } from "axios";

export type ResponseDTO<Data> = {
  metadata: ResponseMetaData;
} & Data;

type ResponseMetaData = Record<string, unknown>;

export class NextApiClient {
  axiosInstance: AxiosInstance;
  constructor() {
    const axiosInstance = axios.create({
      headers: {
        "User-Agent": "Weather app",
        "Content-Type": "application/json",
      },
    });
    this.axiosInstance = axiosInstance;

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (isAxiosError(error)) {
          console.error(error.response.data);
          return Promise.reject(error);
        }
      }
    );
  }
}

export const isAxiosError = (error: any): error is AxiosError => {
  return error.isAxiosError;
};
