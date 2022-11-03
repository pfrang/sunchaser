export interface AzureFunctionCoordinatesItems {
  latitude: string;
  longitude: string;
  date: string;
  time: string;
  symbol: string;
  temperature: number;
  wind: number;
  location: string;
  rank: number;
  weatherRank: number;
}

export type AzureFunctionCoordinateResponse = Record<
  string,
  AzureFunctionCoordinatesItems[]
>;

export interface AzureFunctionCoordinateResponseMappedItems
  extends Omit<AzureFunctionCoordinatesItems, "date"> {
  date: Date;
}

export type AzureFunctionCoordinateMappedResponse = Record<
  string,
  AzureFunctionCoordinateResponseMappedItems[]
>;
