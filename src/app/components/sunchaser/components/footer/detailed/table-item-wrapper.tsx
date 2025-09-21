import { Times } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { dateFormatter } from "app/utils/date-formatter";
import { getAverageItemsFromTimes, getInterval } from "app/utils/times-helper";
import { useState, useEffect, useRef } from "react";
import { TimeTable } from "ui-kit/list-item/list-item-detailed";

export const TableItemWrapper = ({
  day,
  expandList,
}: {
  day: Times[];
  expandList?: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const timeIntervals: Times[] = [
    getAverageItemsFromTimes(getInterval(day, 0, 5), "00-06"),
    getAverageItemsFromTimes(getInterval(day, 6, 11), "06-12"),
    getAverageItemsFromTimes(getInterval(day, 12, 17), "12-18"),
    getAverageItemsFromTimes(getInterval(day, 18, 23), "18-23"),
  ].filter((item): item is Times => item !== undefined);

  const initialRows = Object.keys(timeIntervals).map((time) => {
    if (!timeIntervals[time]) return null;
    const time2 = timeIntervals[time] as Times;
    return time2;
  });

  const [rows, setRows] = useState<(Times | null)[]>(initialRows.slice(0, 4));

  useEffect(() => {
    if (isExpanded) {
      expandList?.();
      setRows(day);
    } else {
      setTimeout(() => {
        setRows(initialRows.slice(0, 4));
      }, 500);
    }
  }, [isExpanded]);

  const date = dateFormatter(new Date(day[0].date));
  const shouldDisplayExpanded = day.length > 4;

  return (
    <>
      <div key={date} className="rounded-lg bg-greens-300 p-2">
        <p>{date}</p>
        <span className="block h-2"></span>
        <div className="transition-all duration-500 ease-in-out">
          <TimeTable times={rows} />
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
