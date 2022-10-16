import { NextApiRequest, NextApiResponse } from "next";
import { resolve } from "path";
import { CoordinatesAPiClient } from "../coordinates-api-client/coordinates-api-client";
import { CoordinatesMapper } from "../mapper/coordinates-mapper";


async function voidWait(timeToDelay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, timeToDelay));
}

export const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const body = req.body

    const response = await new CoordinatesAPiClient().post(body);

    const mappedResponse = new CoordinatesMapper(response).getProps() //todo send response to mapper

    return res.status(200).json({
        ...mappedResponse
    })
  } catch (e) {
    return res.status(500).json({
      response: "Something went wrong"
    })
  }
}
