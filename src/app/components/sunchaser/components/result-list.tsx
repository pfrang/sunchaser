"use client";
import { useEffect, useRef, useState } from "react";
import { Collapse, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React from "react";
import {
  AzureFunctionCoordinatesMappedItems,
  UserLocation,
  Times,
} from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { getInterval, getWeatherIconFromTimes } from "app/utils/times-helper";

import { Flex } from "../../../../ui-kit/flex";
import { StateHelper } from "../../../../states/sunchaser-result";
import {
  MapBoxHelper,
  StartAndEndCoordinates,
} from "../../../utils/mapbox-settings";

import { Carousell } from "./carousell";

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

  const { highlightedCard, setHighlightedCard } = StateHelper.highlightedCard();

  const { mapObject } = StateHelper.mapObject();
  const { mapInstance } = StateHelper.mapInstance();

  const resetMap = () => {
    if (mapObject) {
      mapObject.removeLayer("route");
      mapObject.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        duration: 500,
      });
      mapInstance?.setFitBounds(mapObject);
    }
  };

  const [scrollY, setScrollY] = useState(0);
  const flexRef = useRef<HTMLDivElement | null>(null);

  const onClickCard = (item: AzureFunctionCoordinatesMappedItems) => {
    if (item.index !== highlightedCard?.index && mapObject) {
      const { lat, lon } = {
        lat: item.latitude,
        lon: item.longitude,
      };
      setScrollY(flexRef?.current?.scrollTop as number);

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

  useEffect(() => {
    if (highlightedCard?.date) {
      setScrollY(flexRef?.current?.scrollTop as number);
    } else {
      if (flexRef?.current) {
        flexRef.current.scrollTop = scrollY;
      }
    }
  }, [highlightedCard]);

  return (
    <div className="w-full gap-2 rounded-inherit p-2">
      <div className="flex w-full justify-center">
        <div
          className="w-[150px] cursor-pointer md:w-[300px] lg:w-[450px]"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="block h-2 bg-blues-200 shadow-custom-inner"></span>
        </div>
      </div>

      <Collapse
        style={{
          width: "100%",
        }}
        easing={"ease-in-out"}
        in={isExpanded}
      >
        <div
          ref={flexRef}
          className={`${
            highlightedCard
              ? "gap-0 overflow-y-hidden"
              : "gap-2 overflow-y-auto"
          } max-h-[300px] w-full px-2 md:px-4`}
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
                <div className="relative flex w-full">
                  <Collapse
                    style={{
                      width: "100%",
                    }}
                    easing={"ease-in-out"}
                    in={shouldBeExpanded}
                  >
                    <div
                      key={item.index}
                      className={`flex cursor-pointer items-center rounded-[36px] border-2 border-blues-200 shadow-custom-inner`}
                      onClick={() => onClickCard(item)}
                    >
                      <div className="flex flex-shrink pl-3">
                        <p className="text-variant-poppins text-start font-bold text-white">
                          {`#${item.index + 1}`}
                        </p>
                      </div>
                      <div className="absolute m-auto flex w-full cursor-pointer justify-center">
                        <p className="text-variant-regular text-center text-white ">
                          {shouldBeExpanded ? item.primaryName : ""}
                        </p>
                      </div>

                      <div className="flex w-auto content-center gap-3 pr-4">
                        {Icon(item.times)}
                      </div>
                    </div>
                    <Collapse
                      style={{
                        width: "100%",
                      }}
                      in={highlightedCard?.index === item.index}
                      easing={"ease-in-out"}
                    >
                      <Carousell item={item} />
                    </Collapse>
                  </Collapse>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </Collapse>
    </div>
  );
};

const Icon = (times: Times[]) => {
  const mediaQuery = window && useMediaQuery("(max-width: 800px)");

  const nightIcon = getInterval(times, 0, 5);
  const morningIcon = getInterval(times, 6, 11);
  const afternoonIcon = getInterval(times, 12, 17);
  const eveningIcon = getInterval(times, 18, 23);

  const icons = mediaQuery
    ? {
        morgen: getWeatherIconFromTimes(getInterval(times, 0, 12)),
        kveld: getWeatherIconFromTimes(getInterval(times, 13, 23)),
      }
    : {
        natt: getWeatherIconFromTimes(nightIcon),
        morgen: getWeatherIconFromTimes(morningIcon),
        ettermiddag: getWeatherIconFromTimes(afternoonIcon),
        kveld: getWeatherIconFromTimes(eveningIcon),
      };

  // const icons = {
  //   natt: getIcon(nightIcon),
  //   morgen: getIcon(morningIcon),
  //   ettermiddag: getIcon(afternoonIcon),
  //   kveld: getIcon(eveningIcon),
  // };

  return (
    <>
      {Object.keys(icons).map((key) => {
        if (icons[key]) {
          return (
            <React.Fragment key={key}>
              <Flex
                justifyContent={"space-between"}
                flexDirection={"column"}
                // height={["38px", "52px"]}
                alignItems={"center"}
              >
                <Flex
                  // justifyItems={"flex-end"}
                  justifyContent={"center"}
                  alignItems={"center"}
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
