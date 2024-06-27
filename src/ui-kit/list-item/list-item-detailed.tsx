import { Times } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { ForecastDay } from "app/api/forecast/mapper/forecast-mapper";
import { WeatherIcon } from "ui-kit/weather-icon/weather-icon";
import { WeatherIconList } from "ui-kit/weather-icon/weather-icon-list";

export const TimeTable = ({ times }: { times: (Times | null)[] }) => {
  return (
    <table className="w-full table-fixed" id="row-wrapper">
      <tbody>
        {times.length > 0 &&
          times.map((time, index) => {
            if (time === null) return null;
            const isLastIndex = index === times.length - 1;
            return (
              <tr
                className={`${isLastIndex ? "" : "border-b-2 border-greens-600"}`}
                key={index}
              >
                <td className="w-1/12 text-center align-middle">
                  <p>{time.time}</p>
                </td>
                <td className="w-1/12 text-center align-middle">
                  <WeatherIcon
                    icon={time.symbol as WeatherIconList}
                    className="object-contain"
                  />
                </td>
                <td className="w-3/12">
                  <div className="flex flex-col items-center">
                    {/* <span className="max-w-full truncate">Temp.°C</span> */}
                    <span className="text-red-500">{time.temperature}</span>
                  </div>
                </td>
                <td className="w-3/12">
                  <div className="flex flex-col items-center">
                    {/* <span className="max-w-full truncate">Nedbør mm</span> */}
                    <span className="text-blue-500">{time?.rain || 0}</span>
                  </div>
                </td>
                <td className="w-3/12">
                  <div className="flex flex-col items-center">
                    {/* <span className="max-w-full truncate">Vind m/s</span> */}
                    <span>{time.wind}</span>
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
