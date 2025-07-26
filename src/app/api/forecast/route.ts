import { handleGet } from "./handlers/handle-get";
import { ForecastMappedResponse } from "./mapper/forecast-mapper";

export interface ForecastNextApiResponse extends ForecastMappedResponse {}

export async function GET(req: Request) {
  return await handleGet(req);
}
