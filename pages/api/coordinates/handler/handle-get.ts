import { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";
import { CoordinatesAPiClient } from "../coordinates-api-client/coordinates-api-client";


async function voidWait(timeToDelay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeToDelay));
}

export const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {

  const instance = new CoordinatesAPiClient()
  await voidWait(2000)

  const response = {data: "hei"}
  // const response = await instance.getCoordinates()

  return res.status(200).json({
    response: response.data
  })
}
