import { NextApiRequest, NextApiResponse } from "next";
import { sanitizeNextQuery } from "pages/utils/sanitize-next-query";

import { YrApiClient } from "../api-clients/forecast.api-client";
import { ForecastResponseMapper } from "../mapper/forecast-mapper";

export const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { lon, lat } = sanitizeNextQuery(req.query);
    if (!lon || !lat) {
      throw Error("Error give a a longitude and latitude value to the query");
    }

    const yrApiResponse = await new YrApiClient().get({
      lon,
      lat,
    });

    const mappedYrApiResponse = new ForecastResponseMapper(
      yrApiResponse,
    ).getProps();

    return res.status(200).json({
      ...mappedYrApiResponse,
    });
  } catch (e) {
    return res.status(500).json({
      error: e?.response?.data || e,
    });
  }
};
