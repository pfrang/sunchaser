import { GoogleMapsDetailsApiClient } from "../gmaps-details-api-client/gmaps-details-api-client";
import {
  GoogleMapsDetailsMapper,
  GoogleMapsDetailsResponse,
} from "../mapper/gmaps-details-mapper";
import { ResponseDTO } from "../../../next-api.client";

// async function voidWait(timeToDelay: number): Promise<void> {
//   return new Promise((resolve) => setTimeout(resolve, timeToDelay));
// }

export const gmapsDetailsUrl = "google-maps/details";

export const handleGet = async (req: Request) => {
  const place_id = new URL(req.url).searchParams.get("place_id");
  if (!place_id) {
    return Response.json(
      {
        error: "No place_id provided",
      },
      {
        status: 400,
      },
    );
  }

  const placesDetailsResponse = await new GoogleMapsDetailsApiClient().get(
    place_id as string,
  );

  const placesDetailsMappedData = new GoogleMapsDetailsMapper(
    placesDetailsResponse,
  ).getProps();

  const response: ResponseDTO<GoogleMapsDetailsResponse> = {
    metadata: {},
    data: placesDetailsMappedData.data,
  };

  return Response.json(response, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
