import axios, { AxiosRequestConfig } from "axios";
import useSWR from "swr";

interface NextApiRequest extends AxiosRequestConfig {}

export const useNextApiRequest = (
  requestConfig: Pick<NextApiRequest, "data" | "params" | "url">,
  isReady?: boolean
) => {
  const params = requestConfig.params
    ? Object.entries(requestConfig.params)
    : [];

  const urlWithParams = `${requestConfig.url}${
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
