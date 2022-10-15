import { NextApiRequest, NextApiResponse } from "next";

import { GoogleMapsAutoSearchApiClient } from "../gmaps-auto-seach-api-client/gmaps-auto-seach-api-client";
import { GoogleMapsAutoSearchMapper } from "../mapper/gmaps-auto-search-mapper";

async function voidWait(timeToDelay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeToDelay));
}

export const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { input } = req.query;
  if (!input) {
    throw Error("Please give a valid input to the query!");
  }

  const placesAutoSearchResponse =
    await new GoogleMapsAutoSearchApiClient().get(input as string);

  const placesAutoSearchMappedData = new GoogleMapsAutoSearchMapper(
    placesAutoSearchResponse
  ).getProps();

  return res.status(200).json({
    response: {
      metaData: {},
      items: placesAutoSearchMappedData.data,
    },
  });
};
