"use client";

import { ConditionalPresenter } from "ui-kit/conditional-presenter/conditional-presenter";
import { Spinner } from "ui-kit/spinner/spinner";
import { useForecast } from "app/hooks/use-forecast";
import { useSearchParamsToObject } from "app/hooks/use-search-params";

import { ForecastTableContainer } from "./components/table-container";

export const Forecast = () => {
  const searchParams = useSearchParamsToObject();

  const { data, isLoading, error } = useForecast(
    {
      params: searchParams,
    },
    Boolean(searchParams?.lat),
  );

  const handleClick = () => {
    throw new Error("Simulated client-side error");
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 pt-[68px]">
      <button onClick={handleClick}>Simulate error</button>
      <ConditionalPresenter
        isLoading={isLoading}
        renderLoading={() => (
          <div className="absolute bottom-1/2 left-1/2">
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
