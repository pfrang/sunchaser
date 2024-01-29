import { GoogleMapsDetailsApiClient } from "../gmaps-details-api-client/gmaps-details-api-client";
import {
  GoogleMapsDetailsResponse,
  dtoFromAPiResponseItem,
} from "../dtos/gmaps-details.get-dto";
import { ResponseDTO } from "../../../next-api.client";
import { HandleEndpoint } from "../../../handle-endpoint";

// async function voidWait(timeToDelay: number): Promise<void> {
//   return new Promise((resolve) => setTimeout(resolve, timeToDelay));
// }

export const gmapsDetailsUrl = "google-maps/details";

export const handleGet = async (req: Request) =>
  await HandleEndpoint.Open(async () => {
    const place_id = new URL(req.url).searchParams.get("place_id");
    if (!place_id) throw new Error("Missing place_id parameter");

    const placesDetailsResponse = await new GoogleMapsDetailsApiClient().get(
      place_id as string,
    );

    const placesDetailsMappedData = dtoFromAPiResponseItem(
      placesDetailsResponse,
    );

    const response: ResponseDTO<GoogleMapsDetailsResponse> = {
      metadata: {},
      data: placesDetailsMappedData.data,
    };

    return response;
  });
