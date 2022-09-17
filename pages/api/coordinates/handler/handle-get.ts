import { NextApiRequest, NextApiResponse } from "next";
import { CoordinatesAPiClient } from "../coordinates-api-client/coordinates-api-client";

export const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {

  const instance = new CoordinatesAPiClient()
  const hei = setTimeout(() => {
    console.log("heieiei");

  }, 5000);

  const response = {data: "hei"}
  // const response = await instance.getCoordinates()

  return res.status(200).json({
    response: response.data
  })
}
