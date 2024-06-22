"use client";

import React, { useState } from "react";
import {
  AzureFunctionCoordinatesMappedItems,
  UserLocation,
} from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

import {
  useMapInstance,
  useMapObject,
} from "../../../../../states/sunchaser-result";
import { StartAndEndCoordinates } from "../../../../utils/mapbox-settings";

import { ResultListItem } from "./result-list-item";

export const ResultList = ({
  items,
  userLocation,
}: {
  items: AzureFunctionCoordinatesMappedItems[];
  userLocation: UserLocation;
}) => {
  const [highlightedCardIndex, setHighlightedCardIndex] = useState<
    null | number
  >(null);

  const { mapObject } = useMapObject();
  const { mapInstance } = useMapInstance();

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

  const onClickCard = (item: AzureFunctionCoordinatesMappedItems) => {
    if (item.index !== highlightedCardIndex && mapObject) {
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

      mapObject.flyTo({
        center: [item.longitude, item.latitude],
        duration: 500,
        zoom: 11,
      });

      // mapInstance?.fitBounds(coordinates, 50, 1000);

      mapInstance?.drawLine(coordinates);

      setHighlightedCardIndex(item.index);

      return setTimeout(() => {
        const element = document.getElementById(item.index.toString());
        element?.scrollIntoView({ behavior: "smooth" });
      }, 350);
    }
    setHighlightedCardIndex(null);
    resetMap();
    // return setTimeout(() => {
    //   swiper.update();
    // }, 500);
  };

  return (
    <div className="flex w-full flex-col rounded-inherit px-2">
      <div className={`flex w-full flex-col gap-2 px-2`}>
        {items.map((item) => {
          return (
            <ResultListItem
              key={item.index}
              item={item}
              onClickCard={onClickCard}
              shouldExpand={highlightedCardIndex === item.index}
            />
          );
        })}
      </div>
    </div>
  );
};
