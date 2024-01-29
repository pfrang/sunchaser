import { HandleEndpoint } from "../../../handle-endpoint";
import { GoogleMapsAutoSearchApiClient } from "../gmaps-auto-seach-api-client/gmaps-auto-seach-api-client";
import {
  GoogleMapsAutoSearchDto,
  dtoFromAPiResponseItem,
} from "../dtos/google-auto-search.get-dto";

export type GoogleMapsAutoSearchGetResponse = GoogleMapsAutoSearchDto;

export const handleGet = async (req: Request) =>
  await HandleEndpoint.Open(async () => {
    const input = new URL(req.url).searchParams.get("input");

    if (!input) throw new Error("Missing input parameter");

    const placesAutoSearchResponse =
      await new GoogleMapsAutoSearchApiClient().get(input as string);

    const placesAutoSearchMappedData = dtoFromAPiResponseItem(
      placesAutoSearchResponse,
    );

    return placesAutoSearchMappedData;
  });
