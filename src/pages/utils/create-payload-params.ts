import { PayloadParams } from "../api/azure-function/coordinates/coordinates-api-client/coordinates-api.post-schema";

import { formatDate } from "./convert-date";

export const createPayloadParams = ({
  longitude,
  latitude,
  date,
  travelDistance,
  townSearch,
}) => {
  if (townSearch) {
    return {
      lon: String(longitude),
      lat: String(latitude),
      date: formatDate(date),
      distance: travelDistance.toString(),
      location: townSearch,
    };
  }
  return {
    lon: String(longitude),
    lat: String(latitude),
    date: formatDate(date),
    distance: travelDistance.toString(),
  };
};
