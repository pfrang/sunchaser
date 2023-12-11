import { NextApiRequest, NextApiResponse } from "next";

import { handleGet } from "./handler/handle-get";
import { GoogleMapsAutoSearchMappedData } from "./mapper/gmaps-auto-search-mapper";

export const gmapsAutoSearchUrl = "google-maps/auto-search";

export interface GoogleMapsAutoSearchNextApiResponse {
  metaData: {};
  items: GoogleMapsAutoSearchMappedData[];
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
    case "GET":
      return await handleGet(req, res);
    default:
      res.status(405).json({ status: "Method not allowed" });
  }
};

export default handler;
