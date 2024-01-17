import { CommonMetaData } from "../../common-proprties";

import { handlePost } from "./handler/handle-post";
import { AzureFunctionCoordinatesMappedData } from "./coordinates-api-client/coordinates-api-response-schema";

// export const dynamic = "auto";
// export const dynamicParams = true;
// export const revalidate = false;
// export const fetchCache = "auto";
// export const runtime = "nodejs";
// export const preferredRegion = "auto";
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export interface CoordinatesNextApiResponse
  extends AzureFunctionCoordinatesMappedData {
  metaData: CommonMetaData;
}

export async function POST(req: Request) {
  return await handlePost(req);
}
