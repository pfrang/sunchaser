import { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";
import { GMAPSAutoSearchApiClient } from "../gmaps-auto-seach-api-client/gmaps-auto-seach-api-client";



async function voidWait(timeToDelay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeToDelay));
}

export const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const { input } = req.query
  if (!input) {
    return (
      res.status(500).json({
        response: "BAD REQUEST, Please give the input param"
      })
    )
  }
  const instance = new GMAPSAutoSearchApiClient();
  const response = await instance.getCoordinates(input);

  // const response = await instance.getCoordinates()

  return res.status(200).json({
    response: response.data
  })
}
