import axios from "axios";

import { gmapsDetailsUrl } from "../api/google-maps/details/index.endpoint";

import { NextApiRequest } from "./common-types";

export const fetchTownDetails = async (townId) => {
  try {
    const town = await fetcherFactory({
      url: gmapsDetailsUrl,
      params: { place_id: townId },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!town) return;

    return {
      latitude: town.data.latitude,
      longitude: town.data.longitude,
    };
  } catch (e) {
    throw new Error("Error fetching town details");
  }
};

export const fetcherFactory = async (requestConfig: NextApiRequest) => {
  const response = await axios({ ...requestConfig, baseURL: "/api/" });
  return response.data;
};
