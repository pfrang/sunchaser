import { AzureFunctionGlobalRankItem } from "./api-client/global-rank-api-response-schema";
import { handlePost } from "./handlers/handle-post";

export type GlobalRankNextApiResponse = AzureFunctionGlobalRankItem[];

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
