import axios from "axios";
import useSWR from "swr";

import { azureFuncGetCoordinatesEndPoint } from "../api/azure-function/coordinates/index.endpoint";
import { CoordinatesMappedResponse } from "../api/azure-function/coordinates/mapper/coordinates-mapper";
import { PayloadParams } from "../api/azure-function/coordinates/coordinates-api-client/coordinates-api.post-schema";

export const useCoordinates = (params) => {
  if (!isPayLoadParams(params)) {
    return { error: true };
  }

  const fetcher = async (url) =>
    await axios
      .post(url, params)
      .then((res) => res.data as CoordinatesMappedResponse);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR(azureFuncGetCoordinatesEndPoint, fetcher);

  const isLoading = !data && !error;

  return { data, isLoading, error };
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
