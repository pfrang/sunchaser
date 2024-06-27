import { formatISO, startOfDay, addHours } from "date-fns";
import { Times } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { WeatherIconList } from "ui-kit/weather-icon/weather-icon-list";
import { ForecastTime } from "app/api/forecast/mapper/forecast-mapper";

export const timesAheadOfNow = (times: Times[]): Times[] | null => {
  const filterTimes = times.filter((time) => {
    const timeDateStartOfDay = formatISO(startOfDay(new Date(time.date)));
    const currentDateStartOfDay = formatISO(
      startOfDay(addHours(new Date() as Date, 1)),
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

export const getAverageFromKey = (
  times: Times[] | ForecastTime[],
  key:
    | (keyof Times & ("rank" | "temperature" | "wind" | "rain"))
    | (keyof ForecastTime & ("rank" | "temperature" | "wind" | "rain")),
): number => {
  const sum = times.reduce((acc, time) => acc + time[key], 0);
  return sum / times.length;
};

export const getAverageItemsFromTimes = (
  times: Times[],
  key: string,
): Times | undefined => {
  if (!times.length) return undefined;
  return {
    temperature: Number(getAverageFromKey(times, "temperature").toFixed(1)),
    wind: Number(getAverageFromKey(times, "wind").toFixed(1)),
    // TODO fix rain
    rain: Number(getAverageFromKey(times, "rain").toFixed(1)) || 0,
    symbol: getWeatherIconFromTimes(times),
    rank: getAverageFromKey(times, "rank"),
    date: times[0].date,
    time: key ?? times[0].time,
  };
};

export function getWeatherIconFromTimes(times?: Times[]) {
  if (!times?.length) return;
  const highestRank = times.reduce((prev, current) => {
    return prev.rank > current.rank ? prev : current;
  });
  return highestRank.symbol;

  return WeatherIconList[
    highestRank.symbol.charAt(0).toUpperCase() + highestRank.symbol.slice(1)
  ];
}

export const splitTimesIntoDays = (times: Times[]) => {
  const days: Record<string, Times[]> = {};

  times.forEach((time) => {
    const date = formatISO(startOfDay(new Date(time.date)));
    if (!days[date]) {
      days[date] = [];
    }
    days[date].push(time);
  });

  return days;
};
