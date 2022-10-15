import { CommonData } from "../../../common-proprties";
import { GetGoogleMapsDetailsSLApiResponse } from "../gmaps-details-api-client/gmaps-sl-api-response-schema";
export interface GoogleMapsDetailsData {
  latitude: string;
  longitude: string;
  map_url: string;
}

export interface GoogleMapsDetailsResponse {
  data: GoogleMapsDetailsData | null;
}

export class GoogleMapsDetailsMapper {
  readonly contentData: GetGoogleMapsDetailsSLApiResponse;
  constructor(dataProps: CommonData) {
    if (!dataProps) return null;
    this.contentData = dataProps.data;
  }

  getProps(): GoogleMapsDetailsResponse {
    return {
      data: {
        latitude: String(this.contentData.result.geometry.location.lat),
        longitude: String(this.contentData.result.geometry.location.lng),
        map_url: this.contentData.result.url,
      },
    };
  }
}
