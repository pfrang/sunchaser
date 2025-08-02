import { corsHeaders } from "app/api/utils/cors-headers";

import { CommonMetaData } from "../../common-proprties";

import { handlePost } from "./handler/handle-post";
import { AzureFunctionCoordinatesMappedData } from "./coordinates-api-client/coordinates-api-response-schema";

// export const dynamic = "auto";
// export const dynamicParams = true;
// export const revalidate = false;
// export const fetchCache = "auto";
// export const runtime = "nodejs";
// export const preferredRegion = "auto";
// https://nextjs.orgcode=5A4h1SN2OZAWm25Z8mnLhuQBt-uWfQJhWjozGNiywS_RAzFuT3dUsw==/docs/app/api-reference/file-conventions/route-segment-config
export interface CoordinatesNextApiResponse
  extends AzureFunctionCoordinatesMappedData {
  metaData: CommonMetaData;
}

export const dynamic = "force-static";
export async function POST(req: Request) {
  return await handlePost(req);
}

export async function OPTIONS(req: Request) {
  return new Response(null, { headers: corsHeaders });
}
