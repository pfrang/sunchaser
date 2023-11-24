import { NextApiRequest, NextApiResponse } from "next";

import { GoogleMapsDetailsApiClient } from "../gmaps-details-api-client/gmaps-details-api-client";
import {
  GoogleMapsDetailsMapper,
  GoogleMapsDetailsResponse,
} from "../mapper/gmaps-details-mapper";
import { ResponseDTO } from "../../../next-api.client";

// async function voidWait(timeToDelay: number): Promise<void> {
//   return new Promise((resolve) => setTimeout(resolve, timeToDelay));
// }

export const handleGet = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseDTO<GoogleMapsDetailsResponse>>,
) => {
  const { place_id } = req.query;
  if (!place_id) {
    throw Error("Please provide a place_id in the query!");
  }

  const placesDetailsResponse = await new GoogleMapsDetailsApiClient().get(
    place_id as string,
  );

  const placesDetailsMappedData = new GoogleMapsDetailsMapper(
    placesDetailsResponse,
  ).getProps();

  const response: ResponseDTO<GoogleMapsDetailsResponse> = {
    metadata: {},
    data: placesDetailsMappedData.data,
  };

  return res.status(200).json(response);
};
