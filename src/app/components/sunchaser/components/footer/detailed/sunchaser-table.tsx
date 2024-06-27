import { Times } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { dateFormatter } from "app/utils/date-formatter";
import { getAverageItemsFromTimes, getInterval } from "app/utils/times-helper";
import { useEffect, useMemo, useState } from "react";
import { WeatherIcon } from "ui-kit/weather-icon/weather-icon";
import { WeatherIconList } from "ui-kit/weather-icon/weather-icon-list";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const TimeTable = ({
  interval,
  times,
}: {
  interval: string;
  times: Times[] | never[];
}) => {
  return (
    <>
      {times.length > 0 &&
        times.map((time, index) => {
          const isLastIndex = index === times.length - 1;
          return (
            <tr
              className={`${isLastIndex ? "" : "border-b-2 border-greens-600"}`}
              key={index}
            >
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
    </>
  );
};

export const SunchaserTable = ({ day }: { day: Times[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const timeIntervals: Record<string, Times | undefined> = {
    "00-06": getAverageItemsFromTimes(getInterval(day, 0, 5)),
    "06-12": getAverageItemsFromTimes(getInterval(day, 6, 11)),
    "12-18": getAverageItemsFromTimes(getInterval(day, 12, 17)),
    "18-23": getAverageItemsFromTimes(getInterval(day, 18, 23)),
  };

  const initialRows = Object.keys(timeIntervals).map((time) => {
    const time2 = timeIntervals[time];
    return time2 ? (
      <TimeTable key={time} interval={time} times={[time2]} />
    ) : null;
  });

  const expandedRows = day.map((time) => {
    return <TimeTable key={time.time} interval={time.time} times={[time]} />;
  });

  const [rowsToDisplay, setRowsToDisplay] =
    useState<(JSX.Element | null)[]>(initialRows);

  const date = dateFormatter(new Date(day[0].date));

  const [maxHeight, setMaxHeight] = useState("0px");
  const rowHeight = 70; // Assuming each row is 50px high

  useEffect(() => {
    if (isExpanded) {
      setRowsToDisplay(expandedRows);
    } else {
      setRowsToDisplay(initialRows);
    }
  }, [isExpanded, maxHeight]);

  useEffect(() => {
    if (isExpanded) {
      const newMaxHeight = `${day.length * rowHeight}px`;
      setMaxHeight(newMaxHeight);
    } else {
      const newMaxHeight = `${initialRows.length * rowHeight}px`;
      setMaxHeight(newMaxHeight);
    }
  }, [isExpanded]);

  const shouldDisplayExpanded = day.length > 4;

  return (
    <>
      <div key={date} className="rounded-lg bg-greens-300 p-2">
        <p>{date}</p>
        <span className="block h-2"></span>
        <div
          style={{
            maxHeight: maxHeight,
            overflow: "hidden",
            transition: "max-height 0.5s ease-in-out",
          }}
        >
          <table className="w-full table-fixed" id="row-wrapper">
            <tbody>{rowsToDisplay}</tbody>
          </table>
        </div>
        {shouldDisplayExpanded && (
          <div className="flex size-full items-center justify-center border-t-2 border-greens-600 py-2">
            <div
              className="flex cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <p>Detaljer</p>
              <KeyboardArrowDownIcon
                className={`cursor-pointer ${isExpanded ? "rotate-180 transform" : ""} transition-transform duration-300`}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
