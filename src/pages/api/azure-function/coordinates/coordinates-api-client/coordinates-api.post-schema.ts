export interface PayloadParams {
  lon: string;
  lat: string;
  date: string;
  distance: string;
  location?: string;
}

export interface AzureFunctionPostPayloadParams {
  params: PayloadParams;
}
