import { time } from "console";

import {
  AzureFunctionCoordinatesMappedItems,
  Times,
} from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import {
  getAverageFromKey,
  getAverageItemsFromTimes,
  getInterval,
  getWeatherIconFromTimes,
  splitTimesIntoDays,
} from "app/utils/times-helper";
import { WeatherIcon } from "ui-kit/weather-icon/weather-icon";
import { WeatherIconList } from "ui-kit/weather-icon/weather-icon-list";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { dateFormatter } from "app/utils/date-formatter";

export const SunchaserDetailedList = ({
  highlightedCard,
  resetDetailedTable,
}: {
  highlightedCard?: AzureFunctionCoordinatesMappedItems;
  resetDetailedTable: () => void;
}) => {
  if (!highlightedCard) return null;

  const days = splitTimesIntoDays(highlightedCard?.times);

  // const list = Object.keys(days).map((day) => {
  //   const times = days[day];
  //   return times.map((time: Times) => {
  //     return (
  //       <div key={time.time}>
  //         <p>{time.time}</p>
  //       </div>
  //     );
  //   });
  // });

  const TimeTable = ({
    interval,
    times,
  }: {
    interval: string;
    times: Times[] | never[];
  }) => {
    return (
      <table className="w-full table-fixed" id="row-wrapper">
        <tbody>
          {times.length > 0 &&
            times.map((time, index) => {
              return (
                <tr key={index}>
                  <td className="w-1/12 text-center align-middle">
                    <p>{interval}</p>
                  </td>
                  <td className="w-1/12 text-center align-middle">
                    <WeatherIcon
                      icon={time.symbol as WeatherIconList}
                      className="object-contain"
                    />
                  </td>
                  <td className="w-3/12">
                    <div className="flex flex-col items-center">
                      <span className="max-w-full truncate">Temp.°C</span>
                      <span className="text-red-500">{time.temperature}</span>
                    </div>
                  </td>
                  <td className="w-3/12">
                    <div className="flex flex-col items-center">
                      <span className="max-w-full truncate">Nedbør mm</span>
                      <span className="text-blue-500">{time?.rain || 0}</span>
                    </div>
                  </td>
                  <td className="w-3/12">
                    <div className="flex flex-col items-center">
                      <span className="max-w-full truncate">Vind m/s</span>
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

  const list = Object.values(days).map((day) => {
    const timeIntervals: Record<string, Times | undefined> = {
      "00-06": getAverageItemsFromTimes(getInterval(day, 0, 5)),
      "06-12": getAverageItemsFromTimes(getInterval(day, 6, 11)),
      "12-18": getAverageItemsFromTimes(getInterval(day, 12, 17)),
      "18-23": getAverageItemsFromTimes(getInterval(day, 18, 23)),
    };
    const date = dateFormatter(new Date(day[0].date));

    return (
      <>
        <div key={date} className="rounded-lg bg-greens-300 p-2">
          <p>{date}</p>
          <span className="block h-2"></span>
          {Object.keys(timeIntervals).map((time) => {
            const time2 = timeIntervals[time];
            return time2 ? (
              <>
                <TimeTable key={time} interval={time} times={[time2]} />
                <span className="block border-b-2 border-greens-600"></span>
              </>
            ) : null;
          })}
          <div className="flex size-full items-center justify-center py-2">
            <p>Detaljer</p>
            <KeyboardArrowDownIcon />
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="flex">
        <KeyboardArrowLeftIcon onClick={resetDetailedTable} />
        <p className="inline pl-1">{highlightedCard.primaryName}</p>
      </div>
      <span className="block h-2"></span>
      <div className="flex flex-col gap-4">{list}</div>
    </>
  );
};

const h = [
  {
    temperature: "7.2",
    wind: "2.3",
    rain: "NaN",
    symbol: "partlycloudy",
    rank: 0.9639733794311375,
    date: "2024-06-23T00:00:00.000Z",
  },
];
