import { WeatherIconList } from "../../../ui-kit/weather-svg-ref/weather-icon-list";
import { Times } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

interface TimeSeriesProps extends Times {}

export const TimeSeries = ({
  time,
  weatherRank,
  symbol,
  temperature,
  wind,
}: TimeSeriesProps) => {
  const icon =
    WeatherIconList[symbol.charAt(0).toUpperCase() + symbol.slice(1)];

  return (
    <div className="text-black">
      <div>{time}</div>
      <img src={`/icons/black/svg/${icon}`} />
      <div>{temperature}</div>
      <div>{wind}</div>
    </div>
  );
};
