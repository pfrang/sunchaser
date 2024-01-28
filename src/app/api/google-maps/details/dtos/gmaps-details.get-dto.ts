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

export const dtoFromAPiResponseItem = (
  item: CommonData<GetGoogleMapsDetailsSLApiResponse>,
): GoogleMapsDetailsResponse => {
  return {
    data: {
      latitude: String(item.data.result.geometry.location.lat),
      longitude: String(item.data.result.geometry.location.lng),
      map_url: item.data.result.url,
    },
  };
};
