import { corsHeaders } from "../utils/cors-headers";

import { handleGet } from "./handlers/handle-get";
import { ForecastMappedResponse } from "./mapper/forecast-mapper";

export interface ForecastNextApiResponse extends ForecastMappedResponse {}

export const dynamic = "force-static";

export async function GET(req: Request) {
  return await handleGet(req);
}

export async function OPTIONS(req: Request) {
  return new Response(null, { headers: corsHeaders });
}
