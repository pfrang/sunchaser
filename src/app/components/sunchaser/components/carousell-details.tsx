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
    <div className="flex w-full gap-2">
      {Object.keys(timeIntervals).map((time) => {
        const times = timeIntervals[time] as Times[];
        if (times.length === 0) return null;

        const icon = getWeatherIconFromTimes(timeIntervals[time]);
        return (
          <div
            key={time}
            className="w-full rounded-[18px] border-2 border-blues-1100 p-1 shadow-custom-minor md:p-2"
          >
            <p className="text-variant-regular text-center text-white">
              {time}
            </p>

            <div className="flex h-[24px] content-center justify-center md:h-[48px]">
              <img
                src={`/icons/white/svg/${icon}`}
                className="object-contain"
                alt={icon}
              />
            </div>

            <p className="text-variant-regular text-center text-white">
              {/* // TODO shouldnt be 0 indexed */}
              {new Temperature(timeIntervals[time][0].temperature).toString()}
            </p>
          </div>
        );
      })}
    </div>
  );
};
