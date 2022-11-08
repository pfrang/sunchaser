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
export interface AzureFunctionCoordinatesMappedItems {
  rank: string;
  date: Date;
  latitude: number;
  longitude: number;
  location: string;
  times: Times[];
}

export interface AzureFunctionCoordinatesMappedData {
  userLocation: AzureFunctionCoordinatesMappedItems[];
  ranks: AzureFunctionCoordinatesMappedItems[];
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

export interface AzureFunctionCoordinatesData {
  userLocation: Record<string, AzureFunctionCoordinatesItems[]>;
  ranks: Record<string, AzureFunctionCoordinatesItems[]>;
}

export type AzureFunctionCoordinateResponseMappedItems = Record<
  string,
  AzureFunctionCoordinatesMappedItems[]
>;

export type AzureFunctionCoordinateMappedResponse =
  AzureFunctionCoordinateResponseMappedItems[];
