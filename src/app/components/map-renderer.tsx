"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import mapboxgl from "mapbox-gl";
import { Spinner } from "ui-kit/spinner/spinner";

import { useCoordinates } from "../hooks/use-coordinates";
import { useUserLocation } from "../hooks/use-user-location";
import { sanitizeNextParams } from "../utils/sanitize-next-query";
import { useSearchParamsToObject } from "../hooks/use-search-params";
import { MapBoxHelper } from "../utils/mapbox-settings";
import { StateHelper } from "../../states/sunchaser-result";

import { SettingsButton } from "./settings-button";
import { UserLocationButton } from "./user-location-button";
import { SettingsWrapper } from "./settings-wrapper";
import { Search } from "./_shared/search";

const RouterWrapper = ({ mapBoxKey }: { mapBoxKey: string }) => {
  return (
    <>
      <div className="h-full">
        <Router mapBoxKey={mapBoxKey} />
      </div>
    </>
  );
};

const Router = ({ mapBoxKey }: { mapBoxKey: string }) => {
  mapboxgl.accessToken = mapBoxKey;

  const searchParams = useSearchParamsToObject();
  const router = useRouter();
  const { userLocation } = useUserLocation();

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
  }, [userLocation]);

  const { mapInstance, setMapInstance } = StateHelper.mapInstance();
  const { setMapObject } = StateHelper.mapObject();

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

  return (
    <>
      <SettingsWrapper>
        <Search />
        <SettingsButton />
        <UserLocationButton />
      </SettingsWrapper>
      {/* {shouldHydrate && !userLocation && <LocationModal />} */}
      <section id="section-map" className="h-full">
        <div className="sticky top-0 flex h-full w-full items-center justify-center">
          {isLoading ? (
            <div className="z-50">
              <Spinner />
            </div>
          ) : (
            <>
              <div id="map" className={`m-auto h-full w-full `}></div>
              <div
                id="original-map"
                className="m-auto hidden h-full w-full"
              ></div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default RouterWrapper;