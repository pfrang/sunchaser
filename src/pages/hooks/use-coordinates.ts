import axios, { AxiosRequestConfig } from "axios";
import useSWR from "swr";
import { isEmpty } from "lodash";

import { azureFuncGetCoordinatesEndPoint } from "../api/azure-function/coordinates/index.endpoint";
import { CoordinatesMappedResponse } from "../api/azure-function/coordinates/mapper/coordinates-mapper";
import { PayloadParams } from "../api/azure-function/coordinates/coordinates-api-client/coordinates-api.post-schema";

interface NextApiRequest extends AxiosRequestConfig {}

export const useCoordinates = (
  requestConfig: Pick<NextApiRequest, "data" | "params">,
  isReady?: boolean
) => {
  const params = requestConfig.params
    ? Object.entries(requestConfig.params)
    : [];
  if (!requestConfig.data) return;

  const urlWithParams = `${azureFuncGetCoordinatesEndPoint}${
    params.length > 0 ? "?" : ""
  }${params}`;

  const fetcherRequest = {
    ...requestConfig,
    url: urlWithParams,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let { data, error, mutate } = useSWR(
    isReady ? urlWithParams : null,
    isReady ? () => fetcherFactory(fetcherRequest) : null
  );

  const isLoading = !data && !error;

  return { data, isLoading, error, mutate };
};

export const fetcherFactory = async (requestConfig: NextApiRequest) => {
  const response = await axios({ ...requestConfig, baseURL: "/api/" });
  return response.data;
};
export const isPayLoadParams = (params: any): params is PayloadParams => {
  return (
    params &&
    params.hasOwnProperty("lat") &&
    params.hasOwnProperty("lon") &&
    params.hasOwnProperty("date") &&
    params.hasOwnProperty("distance")
  );
};
