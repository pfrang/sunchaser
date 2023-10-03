import { NextApiRequest, NextApiResponse } from "next";

import { CoordinatesAPiClient } from "../coordinates-api-client/coordinates-api-client";
import { CoordinatesMapper } from "../mapper/coordinates-mapper";
import {
  AzureFunctionPostPayloadParams,
  PayloadParams,
} from "../coordinates-api-client/coordinates-api.post-schema";

export const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!isBodyValid(req.body)) {
      return res.status(400).json({
        error: "Body didnt have the necessary parameters",
      });
    }

    const payLoad: AzureFunctionPostPayloadParams = {
      params: {
        ...req.body,
      },
    };

    const response = await new CoordinatesAPiClient().post(payLoad);

    if (Object.keys(response.data).length === 0)
      return res.status(200).json({
        metadata: {},
        userLocation: {},
        ranks: [],
      });

    const mappedResponse = new CoordinatesMapper(response).getProps();

    return res.status(200).json({
      ...mappedResponse,
    });
  } catch (e) {
    return res.status(500).json({
      error: e,
    });
  }
};

const isBodyValid = (body: any | PayloadParams): body is PayloadParams => {
  return (body as PayloadParams).lon !== undefined;
};
