"use client";
import { useEffect, useRef, useState } from "react";
import { Button, Collapse, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React from "react";
import {
  AzureFunctionCoordinatesMappedItems,
  UserLocation,
  Times,
} from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { getInterval, getWeatherIconFromTimes } from "app/utils/times-helper";
import { useUseSwipeable } from "app/hooks/use-swipeable";

import { StateHelper } from "../../../../states/sunchaser-result";
import { StartAndEndCoordinates } from "../../../utils/mapbox-settings";
import { useDisplayIsFooterExpanded } from "../../../../states/footer";

import { Carousell } from "./carousell";

export const ResultList = ({
  items,
  userLocation,
}: {
  items: AzureFunctionCoordinatesMappedItems[];
  userLocation: UserLocation;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const handlers = useUseSwipeable({
    onSwipedUp: () => setIsExpanded(true),
    onSwipedDown: () => setIsExpanded(false),
  });

  const { highlightedCard, setHighlightedCard } =
    StateHelper.useHighlightedCard();

  const { mapObject } = StateHelper.useMap();
  const { mapInstance } = StateHelper.useMapInstance();

  const resetMap = () => {
    if (mapObject) {
      mapObject.removeLayer("route");
      mapObject.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        duration: 500,
      });
      mapInstance?.setFitBounds();
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

      mapObject.flyTo({
        center: [item.longitude, item.latitude],
        duration: 500,
        zoom: 11,
      });

      // mapInstance?.fitBounds(coordinates, 50, 1000);

      mapInstance?.drawLine(coordinates);

      setHighlightedCard(item);

      return setTimeout(() => {
        const element = document.getElementById(item.index.toString());
        element?.scrollIntoView({ behavior: "smooth" });
      }, 250);
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
    <div className="flex w-full flex-col rounded-inherit px-2">
      <div className="flex w-full justify-center" {...handlers}>
        <div
          className="w-[25px] cursor-pointer pb-2 pt-1 sm:w-[40px]"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="block h-1 rounded-sm bg-blues-200 shadow-custom-minor"></span>
          <span className="block h-1"></span>
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
          className={`flex max-h-[300px] w-full flex-col gap-2 px-2 md:px-4`}
        >
          {items.map((item) => {
            const shouldBeExpanded = highlightedCard?.index === item.index;
            const [isDelayedExpanded, setIsDelayedExpanded] = useState(false);

            useEffect(() => {
              if (shouldBeExpanded) {
                setTimeout(() => {
                  setIsDelayedExpanded(true);
                }, 600);
              }
            }, [shouldBeExpanded]);

            return (
              <React.Fragment key={item.index}>
                <div
                  id={item.index.toString()}
                  className="relative flex w-full flex-col"
                >
                  <Button
                    className={`cursor-pointer rounded-md bg-greens-300 py-1 shadow-custom-minor md:py-2`}
                    onClick={() => onClickCard(item)}
                    fullWidth
                  >
                    <div className="flex flex-shrink pl-3">
                      <p className="text-variant-poppins text-start font-bold">
                        {`#${item.index + 1}`}
                      </p>
                    </div>
                    <div className="absolute m-auto flex w-full cursor-pointer justify-center">
                      <p className="text-variant-regular text-center ">
                        {item.primaryName}
                      </p>
                    </div>

                    <div className="flex w-full justify-end gap-2 pr-2 md:gap-4 md:pr-4">
                      {Icon(item.times)}
                    </div>
                  </Button>
                  <Collapse in={highlightedCard?.index === item.index}>
                    <Carousell item={item} />
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
              <div className="flex flex-col items-center justify-between">
                <div className="flex items-center justify-center">
                  <Image
                    height={28}
                    width={28}
                    src={`/icons/black/svg/${icons[key]}`}
                    alt={icons[key]}
                  />
                </div>
              </div>
            </React.Fragment>
          );
        }
      })}
    </>
  );
};
