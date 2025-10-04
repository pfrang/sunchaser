import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Times } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { ForecastDay } from "app/api/forecast/mapper/forecast-mapper";
import { useForecast } from "app/hooks/use-forecast";
import { useSearchParamsToObject } from "app/hooks/use-search-params";
import { splitTimesIntoDays } from "app/utils/times-helper";
import { useCallback, useMemo } from "react";
import { useHighlightedCard } from "states/sunchaser-result";
import { useCarousel } from "ui-kit/carousel/Carousel";
import { TableItemWrapper } from "./table-item-wrapper";

interface ListWrapperProps {
  expandList: () => void;
}

function transformDays(
  days: Record<string, ForecastDay>
): Record<string, Times[]> {
  const times: Record<string, Times[]> = {};
  Object.values(days).forEach((day) => {
    times[day.overview.date] = day.times.map((time) => {
      return {
        temperature: time.temperature || 0,
        rain: time.rain || 0,
        wind: time.wind || 0,
        symbol: time.symbol || "sun",
        time: time.time,
        date: new Date(day.overview.date),
      } as Times;
    });
  });

  return times;
}

export const ListWrapper = ({ expandList }: ListWrapperProps) => {
  const { scrollPrev } = useCarousel();
  const { highlightedCard, setHighlightedCard } = useHighlightedCard();
  const searchParams = useSearchParamsToObject();

  const { data } = useCallback(
    () =>
      useForecast({
        params: searchParams,
      }),
    [searchParams]
  )();

  const activeTimes: Record<string, Times[]> = useMemo(() => {
    if (!data?.days) return {};
    return highlightedCard
      ? splitTimesIntoDays(highlightedCard.times)
      : transformDays(data.days);
  }, [highlightedCard, data]);

  const location = highlightedCard
    ? highlightedCard.primaryName
    : `Været på ${searchParams?.location || "min lokasjon"}`;

  return (
    <>
      <div className="sticky top-0 flex items-center bg-white pb-2">
        <div className="flex items-center cursor-pointer" onClick={scrollPrev}>
          <KeyboardArrowLeftIcon />
          <p className="pl-2 text-2xl">{location}</p>
        </div>
      </div>
      <span className="block h-2"></span>
      <div className="flex flex-col gap-4">
        {Object.values(activeTimes).map((day: Times[], index) => {
          return (
            <TableItemWrapper expandList={expandList} key={index} day={day} />
          );
        })}
      </div>
    </>
  );
};
