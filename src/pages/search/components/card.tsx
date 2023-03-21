import { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";

import { Angel } from "../../../ui-kit/angel/angel";
import { Arrow } from "../../../ui-kit/arrow/arrow";
import { WeatherIconList } from "../../../ui-kit/weather-svg-ref/weather-icon-list";
import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

import { HighlightedCard } from "./highlighted-card";

interface SmallCardProps {
  isHighlighted: boolean;
  item: AzureFunctionCoordinatesMappedItems;
  index: number;
  setZoomAndHighlightCard: (
    item: AzureFunctionCoordinatesMappedItems,
    bool: boolean
  ) => void;
}

export const Card = ({
  isHighlighted,
  index,
  item,
  setZoomAndHighlightCard,
}: SmallCardProps) => {
  const { date, location, times } = item;

  const swiper = useSwiper();

  //TODO handle de-highlighting on same item does not slide to the card

  const onClick = (item: AzureFunctionCoordinatesMappedItems) => {
    swiper.slideTo(index, 500);
    setZoomAndHighlightCard(item, true);
  };

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
        onClick={() => onClick(item)}
        className={`p-2 rounded-md border-2 text-white transition-all duration-500 ease relative h-[130px]
              ${
                isHighlighted
                  ? "bg-slate-700 text-white"
                  : "bg-white text-black"
              } `}
      >
        <div className="absolute right-[10px]">
          {isHighlighted ? (
            <Angel direction="down" />
          ) : (
            <Angel direction="left" />
          )}
        </div>
        <div className="absolute">
          <div className="">
            <h2 className="absolute left-2/5">{index + 1}</h2>
            <img
              src={`/icons/${isHighlighted ? "white" : "black"}/svg/trophy.svg`}
            />
          </div>
          <div>
            <img
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
          isHighlighted ? "h-[350px]" : "h-[0px]"
        }`}
      >
        {isHighlighted && <HighlightedCard {...item} />}
      </div>
    </div>
  );
};
