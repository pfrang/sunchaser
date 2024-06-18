"use client";

import { ConditionalPresenter } from "ui-kit/conditional-presenter/conditional-presenter";
import { Spinner } from "ui-kit/spinner/spinner";
import { useForecast } from "app/hooks/use-forecast";
import { useSearchParamsToObject } from "app/hooks/use-search-params";

import { ForecastTableContainer } from "./components/table-container";

export const Forecast = () => {
  const searchParams = useSearchParamsToObject();

  const { data, isLoading, error } = useForecast({
    params: searchParams,
  });

  return (
    <div className="flex w-full flex-col gap-4">
      <ConditionalPresenter
        isLoading={isLoading}
        renderLoading={() => (
          <div className="mt-2 flex w-full justify-center">
            <Spinner />
          </div>
        )}
        error={error}
        data={data}
        renderData={(data) => {
          const { days } = data;

          return <ForecastTableContainer rows={days} />;
        }}
      />
    </div>
  );
};
