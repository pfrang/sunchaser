"use client";
import { Flex } from "ui-kit/flex";
import { ConditionalPresenter } from "ui-kit/conditional-presenter/conditional-presenter";
import { Spinner } from "ui-kit/spinner/spinner";
import { useForecast } from "app/hooks/use-forecast";
import { useSearchParamsToObject } from "app/hooks/use-search-params";

import { Spacer } from "../../../ui-kit/spacer/spacer";

import { ForecastTableContainer } from "./components/table-container";

export const Forecast = () => {
  const searchParams = useSearchParamsToObject();

  const { data, isLoading, error } = useForecast(
    {
      params: searchParams,
    },
    Boolean(searchParams.lat),
  );

  return (
    <Flex height={"100%"} flexDirection={"column"} gap={4}>
      <Spacer height={80} />
      <ConditionalPresenter
        isLoading={isLoading}
        renderLoading={() => (
          <Flex position={"absolute"} bottom={"50%"} left={"50%"}>
            <Spinner />
          </Flex>
        )}
        error={error}
        data={data}
        renderData={(data) => {
          const { days } = data;

          return <ForecastTableContainer rows={days} />;
        }}
      />
    </Flex>
  );
};
