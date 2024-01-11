import axios, { AxiosError, AxiosInstance } from "axios";

import { AppConfig } from "../../../app-config";

export class AzureFunctionApiClient {
  baseUrl: string;
  key: string;
  axiosInstance: AxiosInstance;
  constructor() {
    this.baseUrl = `${new AppConfig().azureFunction.host}api`;
    this.key = `?code=${new AppConfig().azureFunction.key}`;
    this.axiosInstance = azureFunctionApiClient;

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (isAxiosError(error)) {
          console.error(error?.response?.data);
          return Promise.reject(error);
        }
      },
    );
  }
}

export const isAxiosError = (error: any): error is AxiosError => {
  return error.isAxiosError;
};

export const azureFunctionApiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
