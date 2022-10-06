import { NextApiRequest, NextApiResponse } from "next";
import { GoogleMapsDetailsApiClient } from "../gmaps-details-api-client/gmaps-details-api-client";
import { GoogleMapsDetailsMapper } from "../mapper/gmaps-details-mapper";



async function voidWait(timeToDelay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeToDelay));
}

export const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { place_id } = req.query
  if (!place_id) {
    throw Error('Please provide a place_id in the query!')
  }

  const placesDetailsResponse = await new GoogleMapsDetailsApiClient().get(place_id as string)

  const placesDetailsMappedData = new GoogleMapsDetailsMapper(placesDetailsResponse).getProps()

  return res.status(200).json({
    response: {
      metaData: {},
      ...placesDetailsMappedData.data
    }
  })
}
