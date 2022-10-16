import axios, { AxiosInstance } from "axios";
import { AppConfig } from "../../../app-config";

export class AzureFunctionApiClient {
  baseUrl: string;
  key: string;
  axiosInstance: AxiosInstance;
  constructor() {
    this.baseUrl = `${new AppConfig().azureFunction.host}`
    this.key = `code=${new AppConfig().azureFunction.key}`
    this.axiosInstance = azureFunctionApiClient
  }
}


export const azureFunctionApiClient = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
})
