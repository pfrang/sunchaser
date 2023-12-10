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
    case "OPTIONS":
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, PATCH, PUT, OPTIONS",
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      );
      res.status(200).end();
      return;
    case "POST":
      return await handlePost(req, res);
    default:
      res.status(405).json({ status: "Method not allowed" });
  }
};

export default handler;
