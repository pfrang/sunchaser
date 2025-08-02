"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "ui-kit/spinner/spinner";
import mapboxgl from "mapbox-gl";
import { MapboxGlobalRankSettings } from "app/utils/mapbox-global-rank-settings";
import { useMapInstance, useMapObject } from "states/sunchaser-result";
import { fetchGlobalRank } from "app/actions/fetch-global-rank";

import { useCoordinates } from "../hooks/use-coordinates";
import { useUserLocation } from "../hooks/use-user-location";
import { sanitizeNextParams } from "../utils/sanitize-next-query";
import { useSearchParamsToObject } from "../hooks/use-search-params";
import { MapBoxHelper } from "../utils/mapbox-settings";

import { UserLocationButton } from "./user-location-button";

const LocationOnIcon = ({ sx, className }) => (
  <svg
    width={sx?.fontSize || 24}
    height={sx?.fontSize || 24}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const MapRenderer = ({ mapboxKey }) => {
  mapboxgl.accessToken = mapboxKey;
  const searchParams = useSearchParamsToObject();
  const router = useRouter();
  const {
    userLocation,
    error: userLocationError,
    requestLocation,
  } = useUserLocation();

  const { data, error, isLoading } = useCoordinates({
    method: "POST",
    params: searchParams,
    data: searchParams,
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
  }, [userLocation, searchParams?.lat]);

  const { mapInstance, setMapInstance } = useMapInstance();
  const { setMapObject } = useMapObject();

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
  }, [data, userLocation?.latitude]);

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
  }, [searchParams?.date, mapInstance, userLocation?.latitude]);

  // Uncomment for heatmap
  // useEffect(() => {
  //   if (globalRanks.length > 0 && mapInstance) {
  //     const map = new MapboxGlobalRankSettings(
  //       mapInstance.map,
  //       globalRanks,
  //     ).addHeatmapWithRanksToMap();
  //   }
  // }, [globalRanks, mapInstance]);

  // No location yet
  if (!userLocation && userLocationError) {
    return (
      <div className="p-8 text-center">
        <LocationOnIcon
          sx={{ fontSize: 48 }}
          className="mx-auto mb-4 text-gray-400"
        />
        <h3 className="mb-4 text-gray-600">Location Not Available</h3>
        <button
          onClick={requestLocation}
          className="rounded bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
        >
          Enable Location
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="fixed bottom-40 z-30 flex w-full justify-end pr-2">
        <UserLocationButton />
      </div>

      <section id="section-map" className="h-full">
        <div className="sticky top-0 flex size-full items-center justify-center">
          {isLoading && (
            <div className="absolute z-50">
              <Spinner />
            </div>
          )}

          <>
            <div id="map" className={`m-auto size-full`}></div>
            <div id="original-map" className="m-auto hidden size-full"></div>
          </>
        </div>
      </section>
    </>
  );
};

export default MapRenderer;
