import { useMemo, useState } from "react";
import { addHours, formatISO, startOfDay } from "date-fns";
import { Collapse } from "@mui/material";
import Image from "next/image";

import { Flex } from "../../../../ui-kit/flex";
import { Text } from "../../../../ui-kit/text";
import {
  AzureFunctionCoordinatesMappedItems,
  Times,
  UserLocation,
} from "../../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { theme } from "../../../../ui-kit/theme";
import { WeatherIconList } from "../../../../ui-kit/weather-svg-ref/weather-icon-list";
import { Spacer } from "../../../../ui-kit/spacer/spacer";
import {
  useHighlightedCard,
  useMap,
  useMapInstance,
} from "../../../../states/sunchaser-result";
import {
  MapBoxHelper,
  StartAndEndCoordinates,
} from "../../../utils/mapbox-settings";

import { Carousell2 } from "./carousell2";

export const ResultList = ({
  items,
  userLocation,
}: {
  items: AzureFunctionCoordinatesMappedItems[];
  userLocation: UserLocation;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const { highlightedCard, setHighlightedCard } = useHighlightedCard();

  const { mapObject } = useMap();
  const { mapInstance } = useMapInstance();

  const resetMap = () => {
    if (mapObject) {
      mapObject.removeLayer("route");
      mapObject.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        duration: 500,
      });
      mapInstance.setFitBounds(mapObject);
    }
  };

  const onClickCard = (item: AzureFunctionCoordinatesMappedItems) => {
    if (item.index !== highlightedCard?.index && mapObject) {
      const { lat, lon } = {
        lat: item.latitude,
        lon: item.longitude,
      };

      const coordinates: StartAndEndCoordinates = {
        start: {
          longitude: lon,
          latitude: lat,
        },
        end: {
          longitude: userLocation.longitude,
          latitude: userLocation.latitude,
        },
      };

      MapBoxHelper.fitBounds(mapObject, coordinates, 50, 1000);

      MapBoxHelper.drawLine(mapObject, coordinates);

      return setHighlightedCard(item);

      // return setTimeout(() => {
      //   swiper.update();
      //   swiper.slideTo(item.index, 1000);
      // }, 500);
    }
    setHighlightedCard(undefined);
    resetMap();
    // return setTimeout(() => {
    //   swiper.update();
    // }, 500);
  };

  return (
    <Flex borderRadius={"inherit"} flexDirection={"column"} gap={2} padding={2}>
      <Flex width={"100%"} justifyContent={"center"}>
        <Flex
          width={["150px", "300px", "450px"]}
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ cursor: "pointer" }}
        >
          <Spacer
            height={"10px"}
            boxShadow={"inset 0px 8px 6px rgba(0, 0, 0, 0.2)"}
            style={{ backgroundColor: "#004871" }}
          />
        </Flex>
      </Flex>
      <Collapse
        style={{
          width: "100%",
        }}
        in={isExpanded}
      >
        <Flex
          flexDirection={"column"}
          maxHeight={"300px"}
          overflowY={"auto"}
          paddingX={[2, 4]}
          gap={highlightedCard ? 0 : 2}
        >
          {items.map((item) => (
            <Flex>
              <Collapse
                style={{
                  width: "100%",
                }}
                easing={"ease-in-out"}
                in={!highlightedCard || highlightedCard?.index === item.index}
              >
                <Flex
                  borderColor={theme.color.blues[2]}
                  padding={[1, 2]}
                  borderRadius={36}
                  borderWidth={2}
                  key={item.index}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  boxShadow={" 0px 6px 10px rgba(0, 0, 0, 0.2)"}
                  clickable
                  onClick={() => onClickCard(item)}
                >
                  <Text
                    textAlign={"start"}
                    variant="poppins"
                    fontWeight={"bold"}
                    color={"white"}
                  >
                    {`#${item.index + 1}`}
                  </Text>
                  <Text textAlign={"center"} color={"white"}>
                    {item.primaryName}
                  </Text>
                  {Icon(item.times)}
                </Flex>
                <Collapse
                  style={{
                    width: "100%",
                  }}
                  in={highlightedCard?.index === item.index}
                >
                  <Carousell2 item={item} />
                </Collapse>
              </Collapse>
            </Flex>
          ))}
        </Flex>
      </Collapse>
    </Flex>
  );
};

const Icon = (times: Times[]) => {
  const filterTimes = times.filter((time) => {
    const timeDateStartOfDay = formatISO(startOfDay(new Date(time.date)));
    const currentDateStartOfDay = formatISO(
      startOfDay(addHours(new Date(), 1))
    );
    return timeDateStartOfDay === currentDateStartOfDay;
  });

  if (!filterTimes.length) return;

  const nightIcon = getInterval(filterTimes, 0, 5);
  const morningIcon = getInterval(filterTimes, 6, 11);
  const afternoonIcon = getInterval(filterTimes, 12, 17);
  const eveningIcon = getInterval(filterTimes, 18, 23);

  const icons = {
    "00-06": getIcon(nightIcon),
    "06-12": getIcon(morningIcon),
    "12-18": getIcon(afternoonIcon),
    "18-23": getIcon(eveningIcon),
  };

  return (
    <>
      <Flex
        // flexDirection={["column", "row"]}
        alignItems={"center"}
        // justifyContent={"center"}
        // justifyContent={"end"}
        alignSelf={"flex-end"}
        height={[24, 48]}
        width={"auto"}
        gap={2}

        // flexGrow={1}
      >
        {Object.keys(icons).map((key) => {
          if (icons[key]) {
            return (
              <Flex flexDirection={"column"}>
                <Text variant="body-small" color="white">
                  {key}
                </Text>
                <Image
                  height={28}
                  width={28}
                  src={`/icons/white/svg/${icons[key]}`}
                  alt={icons[key]}
                />
              </Flex>
            );
          }
        })}
      </Flex>
    </>
  );
};

function getInterval(times: Times[], startHour: number, endHour: number) {
  const betweenInterval = times.filter((time) => {
    const hour = parseInt(time.time.split(":")[0]);
    return hour >= startHour && hour <= endHour;
  });

  return betweenInterval ?? undefined;
}

function getIcon(times?: Times[]) {
  if (!times.length) return;
  const highestRank = times.reduce((prev, current) => {
    return prev.rank > current.rank ? prev : current;
  });

  return WeatherIconList[
    highestRank.symbol.charAt(0).toUpperCase() + highestRank.symbol.slice(1)
  ];
}
