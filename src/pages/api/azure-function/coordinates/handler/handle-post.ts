import { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";
import { CoordinatesAPiClient } from "../coordinates-api-client/coordinates-api-client";


async function voidWait(timeToDelay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeToDelay));
}

export const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const body = req.body

    const response = await new CoordinatesAPiClient().post(body);
    const mappedResponse = response //todo send response to mapper

    return res.status(200).json({
      response: response.data
    })
  } catch (e) {
    return res.status(500).json({
      response: "Something went wrong"
    })
  }
}
