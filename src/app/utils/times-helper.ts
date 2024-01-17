import { formatISO, startOfDay, addHours } from "date-fns";
import { Times } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { WeatherIconList } from "ui-kit/weather-svg-ref/weather-icon-list";

export const timesAheadOfNow = (times: Times[]): Times[] | null => {
  const filterTimes = times.filter((time) => {
    const timeDateStartOfDay = formatISO(startOfDay(new Date(time.date)));
    const currentDateStartOfDay = formatISO(
      startOfDay(addHours(new Date(), 1)),
    );
    return timeDateStartOfDay === currentDateStartOfDay;
  });

  if (!filterTimes.length) return null;

  return filterTimes;
};

export function getInterval(
  times: Times[],
  startHour: number,
  endHour: number,
) {
  const betweenInterval = times.filter((time) => {
    const hour = parseInt(time.time.split(":")[0]);
    return hour >= startHour && hour <= endHour;
  });

  return betweenInterval ?? undefined;
}

export function getWeatherIconFromTimes(times?: Times[]) {
  if (!times?.length) return;
  const highestRank = times.reduce((prev, current) => {
    return prev.rank > current.rank ? prev : current;
  });

  return WeatherIconList[
    highestRank.symbol.charAt(0).toUpperCase() + highestRank.symbol.slice(1)
  ];
}
