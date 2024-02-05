import { ForecastNextApiResponse } from "app/api/forecast/route";
import { yrUrl } from "app/api/forecast/handlers/handle-get";
import { AxiosError } from "axios";

import { useNextApiRequest } from "./use.next-api-request";
import { NextApiRequest } from "./common-types";
import { useSearchParamsToObject } from "./use-search-params";

export const useForecast = (requestConfig: Pick<NextApiRequest, "params">) => {
  const searchParams = useSearchParamsToObject();
  const { data, error, isLoading } = useNextApiRequest<
    ForecastNextApiResponse,
    AxiosError
  >(
    {
      url: yrUrl,
      params: requestConfig.params,
    },
    Boolean(searchParams?.lat && searchParams?.lon),
  );

  return { data, error, isLoading };
};
