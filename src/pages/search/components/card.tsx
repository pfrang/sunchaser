import { useSwiper } from "swiper/react";
import { useMemo } from "react";

import { Angel } from "../../../ui-kit/angel/angel";
import { Flex } from "../../../ui-kit/components/flex";
import { theme } from "../../../ui-kit/theme/theme";
import { WeatherIconList } from "../../../ui-kit/weather-svg-ref/weather-icon-list";
import {
  AzureFunctionCoordinatesMappedItems,
  UserLocation,
} from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { Text } from "../../../ui-kit/components/text";

import { HighlightedCard } from "./highlighted-card";

interface SmallCardProps {
  isHighlighted: boolean;
  item: AzureFunctionCoordinatesMappedItems;
  userLocation: UserLocation;
  index: number;
  setZoomAndHighlightCard: (
    item: AzureFunctionCoordinatesMappedItems,
    bool: boolean
  ) => void;
}

export const Card = ({
  isHighlighted,
  userLocation,
  index,
  item,
  setZoomAndHighlightCard,
}: SmallCardProps) => {
  const {
    date,
    primaryName,
    secondaryName,
    tertiaryName,
    quaternaryName,
    times,
    sunriseTime,
    sunsetTime,
    longitude,
    latitude,
  } = item;

  const swiper = useSwiper();

  const onClick = async (item: AzureFunctionCoordinatesMappedItems) => {
    setZoomAndHighlightCard(item, true);

    // const clientHeight = swiper.wrapperEl.parentElement.clientHeight;
    // const clientWidth = window.innerWidth;
    // if (clientWidth <= 480) {
    //   setHeight(clientHeight - 140); //TODO find out this mobile toolbar browser at the bottom
    // } else {
    //   setHeight(clientHeight - 150);
    // }

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

  const icon = useMemo(() => {
    const filterTimes = times.filter((time) => {
      return time.date === date;
    });

    const highestRank = filterTimes.reduce((prev, current) => {
      return prev.rank > current.rank ? prev : current;
    });

    return WeatherIconList[
      highestRank.symbol.charAt(0).toUpperCase() + highestRank.symbol.slice(1)
    ];
  }, []);

  const desktopHeightOfCard = 120;
  const tabletHeightOfCard = 100;
  const mobileHeightOfCard = 80;

  // const setHeight = useMemo(() => {
  //   const height = swiper.height;
  //   return height;
  // }, []);

  return (
    <div>
      <Flex
        onClick={() => onClick(item)}
        flexDirection={"column"}
        justifyContent={"center"}
        // border={"2px solid black"}
        padding={[4, 6]}
        height={[
          `${mobileHeightOfCard}px`,
          `${tabletHeightOfCard}px`,
          `${desktopHeightOfCard}px`,
        ]}
        borderBottomWidth={"2px"}
        borderWidth={2}
        color={`${isHighlighted ? "white" : "black"}`}
        backgroundColor={`${isHighlighted ? `${theme.colors.black[3]}` : `${theme.color.white}`
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
            <Text variant="body-large">{primaryName}</Text>
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
      <Flex
        height={
          isHighlighted
            ? [
              `${swiper.height - mobileHeightOfCard - 40}px`,
              `${swiper.height - desktopHeightOfCard - 60}px`,
            ]
            : "0px"
        }
      >
        {isHighlighted && (
          <HighlightedCard
            date={date}
            userLocation={userLocation}
            longitude={longitude}
            latitude={latitude}
            sunsetTime={sunsetTime}
            sunriseTime={sunriseTime}
            times={times}
          />
        )}
      </Flex>
    </div>
  );
};
