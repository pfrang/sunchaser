import { ResponseDTO } from "app/api/next-api.client";
import { corsHeaders } from "app/api/utils/cors-headers";

import { handleGet } from "./handler/handle-get";
import { GoogleMapsDetailsResponse } from "./dtos/gmaps-details.get-dto";

export type TownDetailsResponse = ResponseDTO<GoogleMapsDetailsResponse>;

// export const dynamic = "force-static";
export async function GET(req: Request) {
  return await handleGet(req);
}

export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders });
}
