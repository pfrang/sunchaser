import { ResponseDTO } from "app/api/next-api.client";

import { handleGet } from "./handler/handle-get";
import { GoogleMapsDetailsResponse } from "./dtos/gmaps-details.get-dto";

export type TownDetailsResponse = ResponseDTO<GoogleMapsDetailsResponse>;

export async function GET(req: Request) {
  return await handleGet(req);
}
