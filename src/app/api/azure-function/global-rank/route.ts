import { AzureFunctionGlobalRankItem } from "./api-client/global-rank-api-response-schema";
import { handlePost } from "./handlers/handle-post";

export type GlobalRankNextApiResponse = AzureFunctionGlobalRankItem[];

export async function POST(req: Request) {
  return await handlePost(req);
}
