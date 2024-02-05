"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import mapboxgl from "mapbox-gl";

import { useCoordinates } from "../hooks/use-coordinates";
import { useUserLocation } from "../hooks/use-user-location";
import { sanitizeNextParams } from "../utils/sanitize-next-query";
import { useSearchParamsToObject } from "../hooks/use-search-params";
import { useDisplayFooter2 } from "../../states/footer2";
import { useForecast } from "../hooks/use-forecast";
import { MapBoxHelper } from "../utils/mapbox-settings";
import { StateHelper } from "../../states/sunchaser-result";

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
  const { footerItem } = useDisplayFooter2();

  mapboxgl.accessToken = mapBoxKey;

  const searchParams = useSearchParamsToObject();
  const router = useRouter();
  const { userLocation } = useUserLocation();

  const { data, error, isLoading } = useCoordinates({
    method: "POST",
    params: searchParams,
    data: searchParams,
  });

  const {
    data: yrData,
    isLoading: yrLoading,
    error: yrError,
  } = useForecast({
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

  const { mapInstance, setMapInstance } = StateHelper.mapInstance();
  const { setMapObject } = StateHelper.mapObject();

  useEffect(() => {
    if (document.getElementById("map") && userLocation && data) {
      // const longitudes = data.ranks.map((item) => item.longitude);
      // const latitudes = data.ranks.map((item) => item.latitude);
      const userLocation = data?.userLocation;

      const mapInitializer = new MapBoxHelper(
        userLocation.longitude,
        userLocation.latitude,
        data.ranks,
      );

      const primaryMap = mapInitializer.map;

      mapInitializer.initializeMap();

      primaryMap.on("load", () => {
        primaryMap.resize();
        // primaryMap.addControl(new mapboxgl.NavigationControl());
        setMapInstance(mapInitializer);
        setMapObject(primaryMap);
      });
    }
  }, [userLocation, data]);

  // if (!userLocation) return <LocationModal />;

  useEffect(() => {
    if (footerItem === "sunchaser" && mapInstance) {
      mapInstance.addSourceSettings();
      mapInstance.addCluster();
      // mapInstance.addHeatMap();
      mapInstance.addClickHandlers();
      mapInstance.setFitBounds();
    } else {
      mapInstance?.resetMap();
    }
  }, [footerItem, mapInstance]);

  return (
    <section id="section-map" className="h-full">
      <div className="sticky top-0 flex h-full items-center justify-center">
        <div id="map" className="m-auto h-full w-full "></div>
        <div id="original-map" className="m-auto hidden h-full w-full"></div>
      </div>
    </section>
  );
};

export default RouterWrapper;
