export interface AzureFunctionCoordinatesItems {
  latitude: number;
  longitude: number;
  primary_name: string;
  tertiary_name: string;
  quarternary_name: string;
  date: string;
  symbol: string;
  temperature: number;
  time: string;
  wind: number;
  total_rank: number;
  sunrise_date: string | null;
  sunset_date: string | null;
}
export interface AzureFunctionCoordinatesMappedItems {
  rank: string;
  date: Date;
  latitude: number;
  longitude: number;
  times: Times[];
}

export interface AzureFunctionCoordinatesMappedData {
  userLocation: Pick<
    AzureFunctionCoordinatesMappedItems,
    "longitude" | "latitude"
  >;
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
  userLocation: Pick<AzureFunctionCoordinatesItems, "latitude" | "longitude">;
  ranks: Record<string, AzureFunctionCoordinatesItems[]>;
}

export type AzureFunctionCoordinateResponseMappedItems = Record<
  string,
  AzureFunctionCoordinatesMappedItems[]
>;

export type AzureFunctionCoordinateMappedResponse =
  AzureFunctionCoordinateResponseMappedItems[];
