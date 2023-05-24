import { useState } from "react";
import { useSwiper } from "swiper/react";

import { Angel } from "../../../ui-kit/angel/angel";
import { Flex } from "../../../ui-kit/components/flex";
import { theme } from "../../../ui-kit/theme/theme";
import { WeatherIconList } from "../../../ui-kit/weather-svg-ref/weather-icon-list";
import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { Text } from "../../../ui-kit/components/text";
import { Temperature } from "../../utils/temperature";
import { Spacer } from "../../../ui-kit/spacer/spacer";

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

  const [height, setHeight] = useState(0);

  //TODO handle de-highlighting on same item does not slide to the card

  const onClick = async (item: AzureFunctionCoordinatesMappedItems) => {
    setZoomAndHighlightCard(item, true);

    const clientHeight = swiper.wrapperEl.parentElement.clientHeight;
    const clientWidth = window.innerWidth;
    if (clientWidth <= 480) {
      setHeight(clientHeight - 140); //TODO find out this mobile toolbar browser at the bottom
    } else {
      setHeight(clientHeight - 150);
    }

    setTimeout(() => {
      swiper.update();
      swiper.slideTo(index, 1000);
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

  const modifiedTemperature = new Temperature(temperature);

  return (
    <div>
      <Flex
        onClick={() => onClick(item)}
        flexDirection={"column"}
        justifyContent={"center"}
        // border={"2px solid black"}
        padding={[4, 6]}
        height={["80px", "150px"]}
        borderBottomWidth={"2px"}
        borderWidth={2}
        color={`${isHighlighted ? "white" : "black"}`}
        backgroundColor={`${
          isHighlighted ? `${theme.colors.black[3]}` : `${theme.color.white}`
        }`}
      >
        <div className="absolute top-[10px] right-[10px]">
          {isHighlighted ? (
            <Angel direction="down" />
          ) : (
            <Angel direction="left" />
          )}
        </div>
        <Flex justifyContent={"space-between"}>
          <Flex
            // flexDirection={["column", "row"]}
            alignItems={"center"}
            justifyContent={"center"}
            height={[48, 96]}
            width={[48, 96]}
          >
            <img
              className="object-contain"
              src={`/icons/${isHighlighted ? "white" : "black"}/svg/${icon}`}
            />
          </Flex>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            height={"100%"}
            alignItems={"center"}
          >
            <Text variant="body-large">{item.location}</Text>
            {/* <Spacer vertical={4} />
            <Text variant="subtitle-small-bold" color="red">
              {modifiedTemperature.toString()}
            </Text> */}
          </Flex>
          <Flex
            position={"relative"}
            flexDirection={"column"}
            height={[64, 96]}
            width={[64, 96]}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <div className="absolute mb-1">
              <p>{index + 1}</p>
            </div>
            <img
              src={`/icons/${isHighlighted ? "white" : "black"}/svg/trophy.svg`}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex height={isHighlighted ? `${height}px` : "0px"}>
        {isHighlighted && <HighlightedCard {...item} />}
      </Flex>
    </div>
  );
};
