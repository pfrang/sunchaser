export interface AzureFunctionCoordinatesItem {
  latitude: string;
  longitude: string;
  date: string;
  time: string;
  symbol: string;
  temperature: string;
  wind: string;
}

export type AzureFunctionCoordinatesResponseItems =
  Array<AzureFunctionCoordinatesItem>;

export type AzureFunctionGetCoordinatesResponse =
  AzureFunctionCoordinatesResponseItems;
