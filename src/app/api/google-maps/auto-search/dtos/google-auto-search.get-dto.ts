import { isArray } from "lodash";

import {
  GetGoogleMapsAutoSearchSLApiResponse,
  Prediction,
} from "../gmaps-auto-seach-api-client/gmaps-sl-api-response-schema";

export const assemblePredictions = (predictions: Prediction[] | null) => {
  if (!isArray(predictions)) return null;
  const response = predictions.map((item) => {
    return {
      place: item.structured_formatting.main_text,
      place_id: item.place_id,
      country: item.structured_formatting.secondary_text,
    };
  });
  return response;
};

export type GoogleMapsAutoSearchDto = ReturnType<typeof dtoFromAPiResponseItem>;

export const dtoFromAPiResponseItem = (
  item: GetGoogleMapsAutoSearchSLApiResponse,
) => {
  return {
    status: item.status,
    items: assemblePredictions(item.predictions),
  };
};
