import { useEffect, useState } from "react";

import { WeatherIconList } from "../../../ui-kit/weather-svg-ref/weather-icon-list";
import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

interface CardProps {
  item: AzureFunctionCoordinatesMappedItems;
  swapItems: any;
}

export const SmallCard = ({ highlightedCard, item }) => {
  const { date, location, times } = item;
  const [isHovering, setIsHovering] = useState(false);

  const isHighlighted = item === highlightedCard;

  const modifiedDate =
    date &&
    `${new Date(date).getDate()}-${new Date(date).toLocaleString("default", {
      month: "short",
    })}`;
  // const modifiedTime = date && `${date.slice(0, -3)}`;

  const { temperature, wind, time, symbol } = times[0];
  const props = {
    modifiedDate,
    location,
    temperature,
    wind,
    time,
  };

  const icon =
    WeatherIconList[symbol.charAt(0).toUpperCase() + symbol.slice(1)];
  const shouldChangeColor = isHighlighted || isHovering;

  return (
    <div
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`${
        shouldChangeColor
          ? "transition delay-150 duration-200 ease-in-out bg-slate-700 text-white"
          : "bg-white text-black"
      }  p-2 grid grid-cols-3 h-full bg-red rounded-md border-2 hover:bg-slate-700 text-white transition delay-150 duration-150 ease-in-out`}
    >
      <div className="text-md flex flex-col flex h-[50px]">
        <img
          className="object-fit h-[50px] hover:transition delay-150 duration-200 ease-in-out"
          src={`/icons/${shouldChangeColor ? "white" : "black"}/svg/${icon}`}
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-1/5">
          <p>{modifiedDate}</p>
        </div>
        <div>Google Maps?</div>
      </div>

      <div className="flex flex-col justify-between text-right h-full w-full break-words">
        <h2 className="text-md">{location}</h2>

        <div>{`${temperature}°`}</div>
        <div>{wind}</div>
        <div className="text-md tablet:text-xl">{time}</div>
      </div>
    </div>
  );
};
