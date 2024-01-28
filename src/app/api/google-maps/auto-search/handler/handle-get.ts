import { NextResponse } from "next/server";

import { HandleEndpoint } from "../../../handle-endpoint";
import { GoogleMapsAutoSearchApiClient } from "../gmaps-auto-seach-api-client/gmaps-auto-seach-api-client";
import {
  GoogleMapsAutoSearchMappedResponse,
  GoogleMapsAutoSearchMapper,
} from "../mapper/gmaps-auto-search-mapper";

export type GoogleMapsAutoSearchGetResponse =
  NextResponse<GoogleMapsAutoSearchMappedResponse>;

export const handleGet = async (req: Request) => {
  await HandleEndpoint.Open(async () => {
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

    const response =
      HandleEndpoint.createResponse<GoogleMapsAutoSearchMappedResponse>(
        placesAutoSearchMappedData,
      );

    return response;
  });
};
