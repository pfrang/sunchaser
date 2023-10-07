import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

import { MapBoxHelper } from "../mapbox-settings";

export const Map = ({ data, setMapInstance, setMap }) => {
  useEffect(() => {
    if (document.getElementById("map")) {
      const longitudes = data.ranks.map((item) => item.longitude);
      const latitudes = data.ranks.map((item) => item.latitude);
      const userLocation = data.userLocation;
      const mapInitializer = new MapBoxHelper(
        longitudes,
        latitudes,
        userLocation.longitude,
        userLocation.latitude
      );

      const primaryMap = mapInitializer.initializeMap("map");

      primaryMap.on("load", () => {
        primaryMap.resize();
        primaryMap.addControl(new mapboxgl.NavigationControl());
        setMapInstance(mapInitializer);
        setMap(primaryMap);
      });
    }
  }, []);

  return (
    <section id="section-map">
      <div className="flex items-center h-full justify-center sticky top-0">
        <div id="map" className="w-full h-full m-auto "></div>
        <div id="original-map" className="w-full h-full m-auto hidden"></div>
      </div>
    </section>
  );
};
