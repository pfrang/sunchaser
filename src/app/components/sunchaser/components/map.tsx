"use client";
import { MapBoxHelper } from "app/utils/mapbox-settings";
import { CoordinatesNextApiResponse } from "app/api/azure-function/coordinates/route";
import { useEffect } from "react";
import { StateHelper } from "states/sunchaser-result";

interface SunchaserResultMapProps {
  data: CoordinatesNextApiResponse;
}

export const Map = ({ data }: SunchaserResultMapProps) => {
  const { setMapInstance } = StateHelper.mapInstance();
  const { setMapObject } = StateHelper.mapObject();

  // console.log(highlightedCard);

  useEffect(() => {
    if (document.getElementById("map")) {
      const longitudes = data.ranks.map((item) => item.longitude);
      const latitudes = data.ranks.map((item) => item.latitude);
      const userLocation = data.userLocation;

      const mapInitializer = new MapBoxHelper(
        longitudes,
        latitudes,
        userLocation.longitude,
        userLocation.latitude,
      );

      const primaryMap = mapInitializer.initializeMap("map");

      primaryMap.on("load", () => {
        primaryMap.resize();
        // primaryMap.addControl(new mapboxgl.NavigationControl());
        setMapInstance(mapInitializer);
        setMapObject(primaryMap);

        primaryMap.addSource("tiles", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: longitudes.map((lon, index) => ({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [lon, latitudes[index]],
              },
              properties: {}, // Add an empty properties object
            })),
          },
        });

        primaryMap.addLayer({
          id: "tiles",
          type: "circle",
          source: "tiles",
          paint: {
            "circle-radius": 10,
            "circle-color": "#0000ff",
          },
        });

        // primaryMap.on("click", (e) => {
        //   // Get features at clicked point
        //   var features = primaryMap.queryRenderedFeatures(e.point, {
        //     layers: ["tiles"],
        //   });

        //   primaryMap.on("mouseenter", "tiles", () => {
        //     primaryMap.getCanvas().style.cursor = "pointer";
        //   });

        //   if (features.length > 0) {
        //     // Get the unique identifier of the clicked feature
        //     const id = features[0].properties.primaryName;

        //     // Set the `clicked` state of the feature to true
        //     primaryMap.setFeatureState(
        //       { source: "tiles", id },
        //       { clicked: true }
        //     );

        //     // Find the corresponding card in your data

        //     const card = data.ranks.find((item) => item.primaryName === id);

        //     if (card) {
        //       // Call the onClickCard function
        //       // eslint-disable-next-line no-console
        //       console.log(card);
        //     }
        //   }
        // });
      });
    }
  }, []);

  return (
    <section id="section-map" className="h-full">
      <div className="sticky top-0 flex h-full items-center justify-center">
        <div id="map" className="m-auto h-full w-full "></div>
        <div id="original-map" className="m-auto hidden h-full w-full"></div>
      </div>
    </section>
  );
};
