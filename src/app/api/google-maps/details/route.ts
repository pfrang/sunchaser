import { ResponseDTO } from "app/api/next-api.client";

import { handleGet } from "./handler/handle-get";
import { GoogleMapsDetailsResponse } from "./mapper/gmaps-details-mapper";

export type TownDetailsResponse = ResponseDTO<GoogleMapsDetailsResponse>;

export async function GET(req: Request) {
  return await handleGet(req);
}
