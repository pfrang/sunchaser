"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "ui-kit/spinner/spinner";
import mapboxgl from "mapbox-gl";
import { fetchGlobalRank } from "app/actions/fetch-global-rank";
import { MapboxGlobalRankSettings } from "app/utils/mapbox-global-rank-settings";
import { useForecast } from "app/hooks/use-forecast";

import { useCoordinates } from "../hooks/use-coordinates";
import { useUserLocation } from "../hooks/use-user-location";
import { sanitizeNextParams } from "../utils/sanitize-next-query";
import { useSearchParamsToObject } from "../hooks/use-search-params";
import { MapBoxHelper } from "../utils/mapbox-settings";
import { StateHelper } from "../../states/sunchaser-result";

import { UserLocationButton } from "./user-location-button";
import { RightButtonsWrapper } from "./sunchaser/components/filter-buttons/form";

const MapButtonsWrapper = ({ children }) => {
  return (
    <div className="fixed top-6 z-30 flex w-full flex-col items-end gap-4 px-2">
      {children}
    </div>
  );
};

const MapRenderer = ({ mapboxKey }) => {
  mapboxgl.accessToken = mapboxKey;
  const searchParams = useSearchParamsToObject();
  const router = useRouter();
  const { userLocation } = useUserLocation();

  const { data, error, isLoading } = useCoordinates({
    method: "POST",
    params: searchParams,
    data: searchParams,
  });

  useForecast({
    params: searchParams,
  });

  useEffect(() => {
    if (searchParams?.lat || !userLocation) return;

    const params = {
      distance: searchParams?.distance ?? 50,
      lat: searchParams?.lat ?? userLocation.latitude,
      lon: searchParams?.lon ?? userLocation.longitude,
      date: searchParams?.date ?? new Date().toISOString().split("T")[0],
      location: searchParams?.location ?? "",
    };

    const urlParams = sanitizeNextParams(params);

    router.push(`/?${urlParams}`);
  }, [userLocation]);

  const { mapInstance, setMapInstance } = StateHelper.useMapInstance();
  const { mapObject, setMapObject } = StateHelper.mapObject();

  useEffect(() => {
    if (document.getElementById("map") && data?.userLocation.latitude) {
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
        // primaryMap.addControl(new mapboxgl.NavigationControl());'
        mapInitializer.addSourceSettings();
        mapInitializer.setFitBounds();
        mapInitializer.addCluster();
        mapInitializer.addClickHandlers();
        setMapInstance(mapInitializer);
        setMapObject(primaryMap);
      });
    }
  }, [data]);

  useEffect(() => {
    if (!searchParams?.date || !mapInstance) return;
    const dataFetcher = async () => {
      const response = await fetchGlobalRank({
        top: 1000,
        date: searchParams.date,
        group: 10,
      });

      const map = new MapboxGlobalRankSettings(
        mapInstance.map,
        response,
      ).addCircleRanksToMap();
    };

    dataFetcher();
  }, [searchParams?.date, mapInstance]);

  // Uncomment for heatmap
  // useEffect(() => {
  //   if (globalRanks.length > 0 && mapInstance) {
  //     const map = new MapboxGlobalRankSettings(
  //       mapInstance.map,
  //       globalRanks,
  //     ).addHeatmapWithRanksToMap();
  //   }
  // }, [globalRanks, mapInstance]);

  return (
    <>
      <MapButtonsWrapper>
        <RightButtonsWrapper />
      </MapButtonsWrapper>
      <div className="fixed bottom-40 z-30 flex w-full justify-end pr-2">
        <UserLocationButton />
      </div>

      <section id="section-map" className="h-full">
        <div className="sticky top-0 flex size-full items-center justify-center">
          {isLoading ? (
            <div className="z-50">
              <Spinner />
            </div>
          ) : (
            <>
              <div id="map" className={`m-auto size-full`}></div>
              <div id="original-map" className="m-auto hidden size-full"></div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default MapRenderer;
