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
          return Promise.reject({
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
          });
        }
        return Promise.reject({
          message: "An unknown error occurred",
          status: 500,
          data: null,
        });
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
