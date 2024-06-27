import { useForecast } from "app/hooks/use-forecast";
import { useSearchParamsToObject } from "app/hooks/use-search-params";
import { dateFormatter } from "app/utils/date-formatter";
import { ConditionalPresenter } from "ui-kit/conditional-presenter/conditional-presenter";
import { ListItem } from "ui-kit/list-item/list-item";
import { TimeTable } from "ui-kit/list-item/list-item-detailed";
import { Times } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
export const ForecastDetailed = () => {
  const searchParams = useSearchParamsToObject();

  const { data, isLoading, error } = useForecast({
    params: searchParams,
  });

  return (
    <div className="flex flex-col gap-4">
      <ConditionalPresenter
        isLoading={isLoading}
        error={error}
        data={data}
        renderData={(data) => {
          const days = Object.keys(data.days).map((day) => {
            return data.days[day];
          });
          return (
            <>
              {days.map((day) => {
                const date = dateFormatter(new Date(day.overview.date));
                const times: Times[] = day.times.map((time) => {
                  return {
                    temperature: time.temperature || 0,
                    rain: time.rain || 0,
                    wind: time.wind || 0,
                    symbol: time.symbol || "sun",
                    time: time.time,
                  } as Times;
                });
                return (
                  <div className="rounded-lg bg-greens-300 p-2">
                    <p>{date}</p>
                    <TimeTable times={times} />
                  </div>
                );
              })}
            </>
          );
        }}
      />
    </div>
  );
};
