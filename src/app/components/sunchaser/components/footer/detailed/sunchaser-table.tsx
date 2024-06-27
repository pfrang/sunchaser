import { Times } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { dateFormatter } from "app/utils/date-formatter";
import { getAverageItemsFromTimes, getInterval } from "app/utils/times-helper";
import { useEffect, useMemo, useRef, useState } from "react";
import { WeatherIconList } from "ui-kit/weather-icon/weather-icon-list";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { TimeTable } from "ui-kit/list-item/list-item-detailed";

export const SunchaserTable = ({ day }: { day: Times[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const [rows, setRows] = useState<(Times | null)[]>([]);

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

  useEffect(() => {
    if (isExpanded) {
      setRows(day);
    } else {
      setRows(initialRows.slice(0, 4));
    }
  }, [isExpanded]);

  const date = dateFormatter(new Date(day[0].date));

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const scrollHeight = containerRef.current.scrollHeight;
        setMaxHeight(`${scrollHeight}px`);
      }
    };

    if (isExpanded) {
      updateHeight();
    } else {
      // Delay setting maxHeight to allow transition
      setTimeout(() => {
        updateHeight();
      }, 10);
    }
  }, [isExpanded, rows]);

  const shouldDisplayExpanded = day.length > 4;

  return (
    <>
      <div key={date} className="rounded-lg bg-greens-300 p-2">
        <p>{date}</p>
        <span className="block h-2"></span>
        <div
          ref={containerRef}
          style={{
            maxHeight: maxHeight,
          }}
          className="overflow-hidden transition-all duration-500 ease-in-out"
        >
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
