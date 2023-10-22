import {
  ForecastNextApiResponse,
  yrUrl,
} from "pages/api/forecast/index.endpoint";

import {
  UseNextApiRequestResponse,
  useNextApiRequest,
} from "./use.next-api-request";
import { NextApiRequest } from "./common-types";

export const useForecast = (
  requestConfig: Pick<NextApiRequest, "params">,
  isReady?: boolean
) => {
  const {
    data,
    error,
    isLoading,
  }: UseNextApiRequestResponse<ForecastNextApiResponse> = useNextApiRequest(
    {
      url: yrUrl,
      params: requestConfig.params,
    },
    isReady
  );

  return { data, error, isLoading };
};
