export interface PayloadParams {
  lon: string;
  lat: string;
  date: string;
  distance: string;
  location?: string;
  top?: number;
}

export interface AzureFunctionPostPayloadParams {
  params: PayloadParams;
}
