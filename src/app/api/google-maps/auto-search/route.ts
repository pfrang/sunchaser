import {
  GoogleMapsAutoSearchGetResponse,
  handleGet,
} from "./handler/handle-get";

export type GoogleMapsAutoSearchResponse = GoogleMapsAutoSearchGetResponse;

export async function GET(req: Request) {
  return await handleGet(req);
}
