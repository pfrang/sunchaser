import { CommonData } from "../../../common-proprties"
import { GoogleMapsData, Prediction } from "../gmaps-auto-seach-api-client/gmaps-sl-api-response-schema";
import { isArray } from 'lodash'

export interface GoogleMapsAutoSearchData {
  location: string;
  location_id: string;
  country: string;
}

export interface GoogleMapsAutoSearchResponse {
  data: Array<GoogleMapsAutoSearchData> | null
}

export class GMAPSAutoSearchMapper {

  readonly contentData: GoogleMapsData
  constructor(dataProps: CommonData) {
    this.contentData = dataProps.data
  }

  private assemblePredictions(predictions: Prediction[] | null) {
    if (!isArray(predictions)) return null
    const response = predictions.map((item) => {
      return {
        location: item.structured_formatting.main_text,
        location_id: item.place_id,
        country: item.structured_formatting.secondary_text
      }
    })
    return response
  }

  getProps(): GoogleMapsAutoSearchResponse {

    return {
      data: this.assemblePredictions(this.contentData.predictions)

    }
  }
}
