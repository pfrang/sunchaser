export interface AzureFunctionCoordinatesItems {
  weatherRank: number;
  latitude: number;
  longitude: number;
  date: string;
  time: string;
  temperature: number;
  wind: number;
  symbol: string;
  location: string;
}

export interface AzureFunctionCoordinatesMappedItem {
  rank: string;
  date: Date;
  latitude: number;
  longitude: number;
  location: string;
  times: Times[];
}

export interface Times {
  weatherRank: number;
  symbol: string;
  temperature: number;
  wind: number;
  time: string;
}

export interface AzureFunctionMappedResponseItem
  extends Omit<AzureFunctionCoordinatesItems, "date"> {
  date: Date;
}

export interface Rank {
  rank: Record<string, AzureFunctionCoordinatesItems[]>;
}

export type AzureFunctionCoordinateResponse = Rank;
export type AzureFunctionCoordinateResponseMappedItems = Record<
  string,
  AzureFunctionCoordinatesMappedItem[]
>;

export type AzureFunctionCoordinateMappedResponse =
  AzureFunctionCoordinateResponseMappedItems[];
