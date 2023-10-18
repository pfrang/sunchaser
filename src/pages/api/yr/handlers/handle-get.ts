import { NextApiRequest, NextApiResponse } from "next";
import { sanitizeNextQuery } from "pages/utils/sanitize-next-query";

import { YrApiClient } from "../api-clients/yr.api-client";
import { YrResponseMapper } from "../mapper/yr-mapper";

export const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { longitude, latitude } = sanitizeNextQuery(req.query);
    if (!longitude || !latitude) {
      throw Error("Error give a a longitude and latitude value to the query");
    }

    const yrApiResponse = await new YrApiClient().get({
      longitude,
      latitude,
    });

    const mappedYrApiResponse = new YrResponseMapper(yrApiResponse).getProps();

    return res.status(200).json({
      metaData: {},
      data: mappedYrApiResponse.data,
    });
  } catch (e) {
    return res.status(500).json({
      error: e?.response?.data || e,
    });
  }
};
