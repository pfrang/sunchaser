import { useMemo, useState } from "react";
import { formatISO, startOfDay } from "date-fns";
import { Collapse } from "@mui/material";

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
  const [isExpanded, setIsExpanded] = useState(false);

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
          maxHeight={"400px"}
          overflowY={"auto"}
          paddingX={[2, 4]}
          gap={2}
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
                  <Text color={"white"}>{item.index + 1}</Text>
                  <Text color={"white"}>{item.primaryName}</Text>
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
  const icon = () => {
    const filterTimes = times.filter((time) => {
      const timeDateStartOfDay = formatISO(startOfDay(new Date(time.date)));
      const currentDateStartOfDay = formatISO(startOfDay(new Date()));
      return timeDateStartOfDay === currentDateStartOfDay;
    });

    // TODO investigate why this can happen
    if (!filterTimes.length) return;

    const highestRank = filterTimes.reduce((prev, current) => {
      return prev.rank > current.rank ? prev : current;
    });

    return WeatherIconList[
      highestRank.symbol.charAt(0).toUpperCase() + highestRank.symbol.slice(1)
    ];
  };

  return (
    <>
      <Flex
        // flexDirection={["column", "row"]}
        alignItems={"center"}
        justifyContent={"center"}
        height={[24, 48]}
        width={[24, 48]}
      >
        {icon() && (
          <img className="object-contain" src={`/icons/white/svg/${icon()}`} />
        )}
      </Flex>
    </>
  );
};
