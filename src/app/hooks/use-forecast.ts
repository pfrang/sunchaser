import { ForecastNextApiResponse } from "app/api/forecast/route";
import { yrUrl } from "app/api/forecast/handlers/handle-get";
import { AxiosError } from "axios";

import { useNextApiRequest } from "./use.next-api-request";
import { NextApiRequest } from "./common-types";

export const useForecast = (
  requestConfig: Pick<NextApiRequest, "params">,
  isReady?: boolean,
) => {
  const { data, error, isLoading } = useNextApiRequest<
    ForecastNextApiResponse,
    AxiosError
  >(
    {
      url: yrUrl,
      params: requestConfig.params,
    },
    isReady,
  );

  return { data, error, isLoading };
};
