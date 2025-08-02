import { corsHeaders } from "app/api/utils/cors-headers";

import {
  GoogleMapsAutoSearchGetResponse,
  handleGet,
} from "./handler/handle-get";

export type GoogleMapsAutoSearchResponse = GoogleMapsAutoSearchGetResponse;

export const dynamic = "force-static";
export async function GET(req: Request) {
  return await handleGet(req);
}

export async function OPTIONS(req: Request) {
  return new Response(null, { headers: corsHeaders });
}
