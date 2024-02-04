"use client";
import { getInterval, getWeatherIconFromTimes } from "app/utils/times-helper";
import { Times } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

import { Temperature } from "../../../utils/temperature";

export const CarousellDetails = ({ times }: { times: Times[] }) => {
  const timeIntervals = {
    "00-06": getInterval(times, 0, 6),
    "06-12": getInterval(times, 6, 12),
    "12-18": getInterval(times, 12, 18),
    "18-23": getInterval(times, 18, 23),
  };

  return (
    <div className="flex w-full justify-between">
      {Object.keys(timeIntervals).map((time) => {
        const times = timeIntervals[time] as Times[];
        if (times.length === 0) return null;

        const icon = getWeatherIconFromTimes(timeIntervals[time]);
        return (
          <div
            key={time}
            className="flex flex-col gap-2 rounded-[18px] px-3 shadow-custom-minor"
          >
            <p className="text-nowrap text-center">{time}</p>

            <div className="flex h-[24px] content-center justify-center">
              <img
                src={`/icons/black/svg/${icon}`}
                className="object-contain"
                alt={icon}
              />
            </div>

            <p className="text-center">
              {/* // TODO shouldnt be 0 indexed */}
              {new Temperature(timeIntervals[time][0].temperature).toString()}
            </p>
          </div>
        );
      })}
    </div>
  );
};
