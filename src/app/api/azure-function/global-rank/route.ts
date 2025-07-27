import { corsHeaders } from "app/api/utils/cors-headers";

import { AzureFunctionGlobalRankItem } from "./api-client/global-rank-api-response-schema";
import { handlePost } from "./handlers/handle-post";

export type GlobalRankNextApiResponse = AzureFunctionGlobalRankItem[];

export async function POST(req: Request) {
  return await handlePost(req);
}

export async function OPTIONS(req: Request) {
  return new Response(null, { headers: corsHeaders });
}
