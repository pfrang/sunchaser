import { CoordinatesAPiClient } from "../coordinates-api-client/coordinates-api-client";
import { CoordinatesMapper } from "../mapper/coordinates-mapper";
import {
  AzureFunctionPostPayloadParams,
  PayloadParams,
} from "../coordinates-api-client/coordinates-api.post-schema";

export const azureFuncGetCoordinatesEndPoint = "azure-function/coordinates";

export const handlePost = async (req: Request) => {
  const body = await req.json();
  try {
    if (!isBodyValid(body)) {
      Response.json(
        {
          error: "Body didnt have the necessary parameters",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 400,
        },
      );
    }

    const payLoad: AzureFunctionPostPayloadParams = {
      params: {
        ...body,
      },
    };

    const response = await new CoordinatesAPiClient().post(payLoad);

    if (Object.keys(response.data).length === 0) {
      return new Response(
        JSON.stringify({
          metadata: {},
          userLocation: {},
          ranks: [],
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const mappedResponse = new CoordinatesMapper(response).getProps();

    return Response.json(mappedResponse, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify(e), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
};

const isBodyValid = (body: any | PayloadParams): body is PayloadParams => {
  return (body as PayloadParams).lon !== undefined;
};
