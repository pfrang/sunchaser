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

export async function POST(req: Request) {
  return await handlePost(req);
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
