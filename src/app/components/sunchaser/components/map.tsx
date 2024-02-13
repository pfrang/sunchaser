"use client";
import { MapBoxHelper } from "app/utils/mapbox-settings";
import { CoordinatesNextApiResponse } from "app/api/azure-function/coordinates/route";
import { useEffect, useState } from "react";
import { StateHelper } from "states/sunchaser-result";
import { fetchGlobalRank } from "app/actions/fetch-global-rank";
import { useSearchParamsToObject } from "app/hooks/use-search-params";

interface SunchaserResultMapProps {
  data: CoordinatesNextApiResponse;
}

export const Map = ({ data }: SunchaserResultMapProps) => {
  const { setMapInstance } = StateHelper.mapInstance();
  const { setMapObject } = StateHelper.mapObject();
  const searchParams = useSearchParamsToObject();

  useEffect(() => {
    if (document.getElementById("map")) {
      // const longitudes = data.ranks.map((item) => item.longitude);
      // const latitudes = data.ranks.map((item) => item.latitude);
      const userLocation = data.userLocation;

      const mapInitializer = new MapBoxHelper(
        userLocation.longitude,
        userLocation.latitude,
        data.ranks,
      );

      const primaryMap = mapInitializer.map;

      mapInitializer.initializeMap();

      primaryMap.on("load", () => {
        primaryMap.resize();
        mapInitializer.sourceAndLayerAfterLoad();
        // primaryMap.addControl(new mapboxgl.NavigationControl());
        setMapInstance(mapInitializer);
        setMapObject(primaryMap);
      });
    }
  }, []);

  return (
    <section id="section-map" className="h-full">
      <div className="sticky top-0 flex h-full items-center justify-center">
        <div id="map" className="m-auto size-full "></div>
        <div id="original-map" className="m-auto hidden size-full"></div>
      </div>
    </section>
  );
};
