import { HandleEndpoint } from "../../handle-endpoint";
import { YrApiClient } from "../api-clients/forecast.api-client";
import { ForecastResponseMapper } from "../mapper/forecast-mapper";

export const yrUrl = "forecast";

export const handleGet = async (req: Request) =>
  await HandleEndpoint.Open(async () => {
    const lat = new URL(req.url).searchParams.get("lat");
    const lon = new URL(req.url).searchParams.get("lon");

    if (!lat || !lon) throw new Error("Missing lat or lon parameter");

    const yrApiResponse = await new YrApiClient().get({
      lon,
      lat,
    });

    const mappedYrApiResponse = new ForecastResponseMapper(
      yrApiResponse,
    ).getProps();

    return mappedYrApiResponse;
  });
