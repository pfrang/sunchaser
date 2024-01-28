import {
  GoogleMapsAutoSearchGetResponse,
  handleGet,
} from "./handler/handle-get";

export type GoogleMapsAutoSearchResponse = GoogleMapsAutoSearchGetResponse;

export const gmapsAutoSearchUrl = "google-maps/auto-search";

export async function GET(req: Request) {
  return await handleGet(req);
}

export async function OPTIONS() {
  const res = new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PATCH, PUT, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    },
  });

  return res;
}
