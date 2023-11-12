import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { MapBoxHelper } from "pages/utils/mapbox-settings";

interface SunchaserResultMapProps {
  data: any;
  setMapInstance: any;
  setMap: any;
  setHighlightedCard: any;
}

export const Map = ({
  data,
  setMapInstance,
  setMap,
  setHighlightedCard,
}: SunchaserResultMapProps) => {
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

        primaryMap.on("click", (e) => {
          // Get features at clicked point
          var features = primaryMap.queryRenderedFeatures(e.point, {
            layers: ["tiles"],
          });

          primaryMap.on("mouseenter", "tiles", () => {
            primaryMap.getCanvas().style.cursor = "pointer";
          });

          if (features.length > 0) {
            // Get the unique identifier of the clicked feature
            const id = features[0].properties.id;

            // Set the `clicked` state of the feature to true
            primaryMap.setFeatureState(
              { source: "tiles", id },
              { clicked: true }
            );

            // Find the corresponding card in your data

            const card = data.ranks.find((item) => item.id === id);

            if (card) {
              // Call the onClickCard function
              setHighlightedCard(card);
            }
          }
        });
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
