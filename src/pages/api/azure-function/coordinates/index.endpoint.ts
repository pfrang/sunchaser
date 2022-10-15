import { NextApiRequest, NextApiResponse } from "next";

import { handlePost } from "./handler/handle-post";

export const azureFuncGetCoordinatesEndPoint =
  "/api/azure-function/coordinates";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      return await handlePost(req, res);
    default:
      res.status(405).json({ status: "Method not allowed" });
  }
};

export default handler;
