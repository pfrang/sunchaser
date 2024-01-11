import { GoogleMapsAutoSearchApiClient } from "../gmaps-auto-seach-api-client/gmaps-auto-seach-api-client";
import { GoogleMapsAutoSearchMapper } from "../mapper/gmaps-auto-search-mapper";
export const gmapsAutoSearchUrl = "google-maps/auto-search";

export const handleGet = async (req: Request) => {
  const input = new URL(req.url).searchParams.get("input");
  if (!input) {
    return Response.json(
      {
        error: "No input provided",
      },
      {
        status: 400,
      },
    );
  }

  const placesAutoSearchResponse =
    await new GoogleMapsAutoSearchApiClient().get(input as string);

  const placesAutoSearchMappedData = new GoogleMapsAutoSearchMapper(
    placesAutoSearchResponse,
  ).getProps();

  return Response.json(
    { metaData: {}, items: placesAutoSearchMappedData.data },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
