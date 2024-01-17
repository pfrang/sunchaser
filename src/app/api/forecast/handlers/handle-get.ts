import { YrApiClient } from "../api-clients/forecast.api-client";
import { ForecastResponseMapper } from "../mapper/forecast-mapper";

export const yrUrl = "forecast";

export const handleGet = async (req: Request) => {
  const lat = new URL(req.url).searchParams.get("lat");
  const lon = new URL(req.url).searchParams.get("lon");

  try {
    if (!lon || !lat) {
      return Response.json(
        {
          error: "No lon or lat provided",
        },
        {
          status: 400,
        },
      );
    }

    const yrApiResponse = await new YrApiClient().get({
      lon,
      lat,
    });

    const mappedYrApiResponse = new ForecastResponseMapper(
      yrApiResponse,
    ).getProps();

    return Response.json(mappedYrApiResponse, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify(e), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
};
