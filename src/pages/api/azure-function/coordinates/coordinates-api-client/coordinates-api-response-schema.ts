export interface AzureFunctionCoordinatesItems {
  rank: number;
  latitude: number;
  longitude: number;
  date: string;
  primary_name: string;
  secondary_name: string;
  tertiary_name: string;
  quaternary_name: string;
  symbol: string;
  temperature: number;
  time: string;
  wind: number;
  sunrise_time: string | null;
  sunset_time: string | null;
}
export interface AzureFunctionCoordinatesMappedItems {
  rank: string;
  latitude: number;
  longitude: number;
  date: Date;
  primaryName: string;
  secondaryName: string;
  tertiaryName: string;
  quaternaryName: string;
  sunriseTime: string;
  sunsetTime: string;
  times: Times[];
}

export interface Times {
  rank: number;
  symbol: string;
  temperature: number;
  wind: number;
  time: string;
  date: Date;
}

export interface UserLocation
  extends Pick<AzureFunctionCoordinatesMappedItems, "longitude" | "latitude"> {}

export interface AzureFunctionCoordinatesMappedData {
  userLocation: UserLocation;
  ranks: AzureFunctionCoordinatesMappedItems[];
}

export interface AzureFunctionMappedResponseItem
  extends Omit<AzureFunctionCoordinatesItems, "date"> {
  date: Date;
}

export interface AzureFunctionCoordinatesData {
  user_location: Pick<AzureFunctionCoordinatesItems, "latitude" | "longitude">;
  ranks: Record<string, AzureFunctionCoordinatesItems[]>;
}

export type AzureFunctionCoordinateResponseMappedItems = Record<
  string,
  AzureFunctionCoordinatesMappedItems[]
>;
