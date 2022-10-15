import axios, { AxiosInstance } from "axios";

import { AppConfig } from "../../../app-config";

export class AzureFunctionApiClient {
  baseUrl: string;
  axiosInstance: AxiosInstance;
  constructor() {
    this.baseUrl = `${new AppConfig().azureFunction.host}/api`;
    this.axiosInstance = azureFunctionApiClient;
  }
}

export const azureFunctionApiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
