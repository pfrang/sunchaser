import { NextApiRequest, NextApiResponse } from "next";

import { handleGet } from "./handlers/handle-get";

export const yrUrl = "google-maps/auto-search";

export interface YrNextApiResponse {
  metaData: {};
  data: any;
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return await handleGet(req, res);
    default:
      res.status(405).json({ status: "Method not allowed" });
  }
};

export default handler;
