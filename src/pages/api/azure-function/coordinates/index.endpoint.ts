import { NextApiRequest, NextApiResponse } from "next";

import { CommonMetaData } from "../../common-proprties";

import { handlePost } from "./handler/handle-post";
import {
  AzureFunctionCoordinatesData,
  AzureFunctionCoordinatesMappedData,
} from "./coordinates-api-client/coordinates-api-response-schema";

export const azureFuncGetCoordinatesEndPoint = "azure-function/coordinates";

export interface CoordinatesNextApiResponse
  extends AzureFunctionCoordinatesMappedData {
  metaData: CommonMetaData;
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      return await handlePost(req, res);
    default:
      res.status(405).json({ status: "Method not allowed" });
  }
};

export default handler;
