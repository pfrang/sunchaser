import { NextApiRequest, NextApiResponse } from "next";
import { ResponseDTO } from "pages/api/next-api.client";

import { handleGet } from "./handler/handle-get";
import { GoogleMapsDetailsResponse } from "./mapper/gmaps-details-mapper";

export const gmapsDetailsUrl = "google-maps/details";

export type TownDetailsResponse = ResponseDTO<GoogleMapsDetailsResponse>;

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return await handleGet(req, res);
    default:
      res.status(405).json({ status: "Method not allowed" });
  }
};

export default handler;
