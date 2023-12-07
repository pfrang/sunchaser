import { useEffect, useRef, useState } from "react";
import { Collapse, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { getIcon, getInterval } from "pages/utils/times-helper";
import React from "react";

import { Flex } from "../../../../ui-kit/flex";
import { Text } from "../../../../ui-kit/text";
import {
  AzureFunctionCoordinatesMappedItems,
  Times,
  UserLocation,
} from "../../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { theme } from "../../../../ui-kit/theme";
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
  expandFooter,
}: {
  items: AzureFunctionCoordinatesMappedItems[];
  userLocation: UserLocation;
  expandFooter: (input: boolean) => void;
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
      setScrollY(flexRef.current.scrollTop);

      expandFooter(false);

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

  const [scrollY, setScrollY] = useState(0);
  const flexRef = useRef(null);

  useEffect(() => {
    if (highlightedCard?.date) {
      setScrollY(flexRef.current.scrollTop);
    } else {
      flexRef.current.scrollTop = scrollY;
    }
  }, [highlightedCard]);

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
        easing={"ease-in-out"}
        in={isExpanded}
      >
        <Flex
          ref={flexRef}
          flexDirection={"column"}
          maxHeight={["300px"]}
          overflowY={highlightedCard ? "hidden" : "auto"}
          paddingX={[2, 4]}
          gap={highlightedCard ? 0 : 2}
        >
          {items.map((item) => {
            const shouldBeExpanded =
              !highlightedCard || highlightedCard?.index === item.index;
            // const [isDelayedExpanded, setIsDelayedExpanded] = useState(false);

            // useEffect(() => {
            //   if (shouldBeExpanded) {
            //     setTimeout(() => {
            //       setIsDelayedExpanded(true);
            //     }, 600);
            //   }
            // }, [shouldBeExpanded]);

            return (
              <React.Fragment key={item.index}>
                <Flex
                  position={"relative"}
                  // display={shouldBeExpanded ? "flex" : "none"}
                >
                  <Collapse
                    style={{
                      width: "100%",
                    }}
                    easing={"ease-in-out"}
                    in={shouldBeExpanded}
                  >
                    <Flex
                      borderColor={theme.color.blues[2]}
                      paddingY={[1, 2]}
                      // paddingX={[3, 3]}
                      borderRadius={36}
                      borderWidth={2}
                      key={item.index}
                      // justifyContent={"space-between"}
                      alignItems={"center"}
                      boxShadow={" 0px 6px 10px rgba(0, 0, 0, 0.2)"}
                      clickable
                      onClick={() => onClickCard(item)}
                    >
                      <Flex paddingLeft={3} flexShrink={1}>
                        <Text
                          textAlign={"start"}
                          variant="poppins"
                          fontWeight={"bold"}
                          color={"white"}
                        >
                          {`#${item.index + 1}`}
                        </Text>
                      </Flex>

                      <Flex
                        position={"absolute"}
                        justifyContent={"center"}
                        margin={"auto"}
                        width={"100%"}
                        clickable
                      >
                        <Text textAlign={"center"} color={"white"}>
                          {shouldBeExpanded ? item.primaryName : ""}
                        </Text>
                      </Flex>

                      <Flex
                        alignItems={"center"}
                        width={"auto"}
                        gap={3}
                        paddingRight={4}

                        // py={1}
                      >
                        {Icon(item.times)}
                      </Flex>
                    </Flex>
                    <Collapse
                      style={{
                        width: "100%",
                      }}
                      in={highlightedCard?.index === item.index}
                      easing={"ease-in-out"}
                    >
                      <Carousell2 item={item} />
                    </Collapse>
                  </Collapse>
                </Flex>
              </React.Fragment>
            );
          })}
        </Flex>
      </Collapse>
    </Flex>
  );
};

const Icon = (times: Times[]) => {
  const mediaQuery = window && useMediaQuery("(max-width: 800px)");

  const nightIcon = getInterval(times, 0, 5);
  const morningIcon = getInterval(times, 6, 11);
  const afternoonIcon = getInterval(times, 12, 17);
  const eveningIcon = getInterval(times, 18, 23);

  // const icons = mediaQuery
  //   ? {
  //       morgen: getIcon(getInterval(times, 0, 12)),
  //       kveld: getIcon(getInterval(times, 13, 23)),
  //     }
  //   : {
  //       natt: getIcon(nightIcon),
  //       morgen: getIcon(morningIcon),
  //       ettermiddag: getIcon(afternoonIcon),
  //       kveld: getIcon(eveningIcon),
  //     };

  const icons = {
    natt: getIcon(nightIcon),
    morgen: getIcon(morningIcon),
    ettermiddag: getIcon(afternoonIcon),
    kveld: getIcon(eveningIcon),
  };

  return (
    <>
      {Object.keys(icons).map((key) => {
        if (icons[key]) {
          return (
            <React.Fragment key={key}>
              <Flex
                justifyContent={"space-between"}
                flexDirection={"column"}
                height={["38px", "52px"]}
              >
                <Text
                  width={"100%"}
                  marginTop={["-3px", "-8px"]}
                  textAlign={"center"}
                  variant="poppins-small"
                  color="white"
                >
                  {key === "ettermiddag" ? (
                    <>
                      etter-
                      <br />
                      middag
                    </>
                  ) : (
                    key
                  )}
                </Text>
                <Flex
                  // justifyItems={"flex-end"}
                  justifyContent={"center"}
                >
                  <Image
                    height={28}
                    width={28}
                    src={`/icons/white/svg/${icons[key]}`}
                    alt={icons[key]}
                  />
                </Flex>
              </Flex>
            </React.Fragment>
          );
        }
      })}
    </>
  );
};
