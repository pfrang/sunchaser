import { useEffect, useState } from "react";

import { WeatherIconList } from "../../../ui-kit/weather-svg-ref/weather-icon-list";
import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

import { HighlightedCard } from "./highlighted-card";

interface SmallCardProps {
  isHighlighted: boolean;
  item: AzureFunctionCoordinatesMappedItems;
  index: number;
}

export const Card = ({ isHighlighted, index, item }: SmallCardProps) => {
  const { date, location, times } = item;

  const modifiedDate =
    date &&
    `${new Date(date).getDate()}-${new Date(date).toLocaleString("default", {
      month: "short",
    })}`;
  // const modifiedTime = date && `${date.slice(0, -3)}`;

  const { temperature, wind, time, symbol } = times[0];

  const icon =
    WeatherIconList[symbol.charAt(0).toUpperCase() + symbol.slice(1)];

  return (
    <div>
      <div
        className={`p-2 rounded-md border-2 text-white transition-all duration-500 ease relative h-[200px]
              ${
                isHighlighted
                  ? "bg-slate-700 text-white"
                  : "bg-white text-black"
              } `}
      >
        <div className="absolute">
          <div className="">
            <h2 className="absolute left-2/5">{index + 1}</h2>
            <img
              className="object-fit h-[50px] hover:transition delay-150 duration-200 ease-in-out"
              src={`/icons/${isHighlighted ? "white" : "black"}/svg/trophy.svg`}
            />
          </div>
          <div>
            <img
              className="object-fit h-[50px] hover:transition delay-150 duration-200 ease-in-out"
              src={`/icons/${isHighlighted ? "white" : "black"}/svg/${icon}`}
            />
          </div>
        </div>
        <div className="flex justify-center items-center h-full">
          <h1 className="text-2xl">{item.location}</h1>
        </div>
      </div>
      <div
        className={`flex w-full h-full justify-center items-center transition-all duration-500 ease ${
          isHighlighted ? "h-[500px]" : "h-[0px]"
        }`}
      >
        {isHighlighted && <HighlightedCard {...item} />}
      </div>
    </div>
  );
};
