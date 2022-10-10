import axios from "axios";
import useSWR from "swr";
import { azureFuncGetCoordinatesEndPoint } from "../api/azure-function/coordinates/index.endpoint";

export const useCoordinates = (params) => {

  const fetcher = async (url) =>
    await axios
      .post(url, params)
      .then((res) => res.data);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR(azureFuncGetCoordinatesEndPoint, fetcher);

  const isLoading = !data && !error;

  return { data, isLoading, error };
};
