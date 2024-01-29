import { CoordinatesAPiClient } from "../coordinates-api-client/coordinates-api-client";
import { CoordinatesMapper } from "../mapper/coordinates-mapper";
import {
  AzureFunctionPostPayloadParams,
  PayloadParams,
} from "../coordinates-api-client/coordinates-api.post-schema";
import { HandleEndpoint } from "../../../handle-endpoint";

export const azureFuncGetCoordinatesEndPoint = "azure-function/coordinates";

export const handlePost = async (req: Request) =>
  await HandleEndpoint.Open(async () => {
    const body = await req.json();

    if (!isBodyValid(body))
      throw new Error("Body didnt have the necessary schema");

    const payLoad: AzureFunctionPostPayloadParams = {
      params: {
        ...body,
      },
    };

    const response = await new CoordinatesAPiClient().post(payLoad);

    if (Object.keys(response.data).length === 0) {
      const response = {
        metadata: {},
        userLocation: {},
        ranks: [],
      };
      return response;
    }

    const mappedResponse = new CoordinatesMapper(response).getProps();

    return mappedResponse;
  });

const isBodyValid = (body: any | PayloadParams): body is PayloadParams => {
  return (body as PayloadParams).lon !== undefined;
};
