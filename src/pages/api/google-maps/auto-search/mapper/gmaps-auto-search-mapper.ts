import { CommonData } from "../../../common-proprties"
import { GetGoogleMapsAutoSearchSLApiResponse, Prediction } from "../gmaps-auto-seach-api-client/gmaps-sl-api-response-schema";
import { isArray } from "lodash";

export interface GoogleMapsAutoSearchMappedData {
  place: string;
  place_id: string;
  country: string;
}

export interface GoogleMapsAutoSearchMappedResponse {
  data: Array<GoogleMapsAutoSearchMappedData> | null
}

export class GoogleMapsAutoSearchMapper {

  readonly contentData: GetGoogleMapsAutoSearchSLApiResponse
  constructor(dataProps: CommonData) {
    this.contentData = dataProps.data
  }

  private assemblePredictions(predictions: Prediction[] | null) {
    if (!isArray(predictions)) return null
    const response = predictions.map((item) => {
      return {
        place: item.structured_formatting.main_text,
        place_id: item.place_id,
        country: item.structured_formatting.secondary_text
      }
    })
    return response
  }

  getProps(): GoogleMapsAutoSearchMappedResponse {

    return {
      data: this.assemblePredictions(this.contentData.predictions)

    }
  }
}
