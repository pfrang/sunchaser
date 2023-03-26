import { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";

import { Angel } from "../../../ui-kit/angel/angel";
import { Arrow } from "../../../ui-kit/arrow/arrow";
import { Flex } from "../../../ui-kit/components/flex";
import { theme } from "../../../ui-kit/theme/theme";
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

  const onClick = async (item: AzureFunctionCoordinatesMappedItems) => {
    setZoomAndHighlightCard(item, true);
    setTimeout(() => {
      swiper.update();
      swiper.slideTo(index, 500);
      window.scrollTo(0, 0);
    }, 500);
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
      <Flex
        onClick={() => onClick(item)}
        flexDirection={"column"}
        padding={[4, 5]}
        // border={"2px solid black"}
        height={["110px", "150px"]}
        borderBottomWidth={"2px"}
        borderWidth={2}
        color={`${isHighlighted ? "white" : "black"}`}
        backgroundColor={`${
          isHighlighted ? `${theme.colors.black[3]}` : `${theme.color.white}`
        }`}
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
      </Flex>
      <Flex height={isHighlighted ? ["250px", "400px"] : "0px"}>
        {/* <Flex height={["200px", "100px"]}> */}
        {isHighlighted && <HighlightedCard {...item} />}
      </Flex>
    </div>
  );
};
