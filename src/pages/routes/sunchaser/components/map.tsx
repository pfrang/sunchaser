import { useEffect } from "react";
import { MapBoxHelper } from "pages/utils/mapbox-settings";

import { useMap, useMapInstance } from "../../../../states/sunchaser-result";
import { CoordinatesNextApiResponse } from "../../../api/azure-function/coordinates/index.endpoint";
import mapboxgl from "mapbox-gl";
interface SunchaserResultMapProps {
  data: CoordinatesNextApiResponse;
}

export const Map = ({ data }: SunchaserResultMapProps) => {
  const { setMap } = useMap();
  const { setMapInstance } = useMapInstance();

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
        setMapInstance(mapInitializer);
        setMap(primaryMap);
      
        // Add the cluster source for your existing points
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
              properties: {
                primaryName: data.ranks[index].primaryName,
                rank: data.ranks[index].rank,
                // Add more properties as needed
              },
            })),
          },
          cluster: true,
          clusterMaxZoom: 15,
          clusterRadius: 200,
        });


        // Add a source for the main user location
        primaryMap.addSource("mainUserLocation", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [userLocation.longitude, userLocation.latitude],
                },
                properties: {}, // Add an empty properties object
              },
            ],
          },
        });
      
        // Add a layer for the main user location
        primaryMap.addLayer({
          id: "mainUserLocation",
          type: "circle",
          source: "mainUserLocation",
          paint: {
            "circle-radius": 10,
            "circle-color": "#FF0000", // You can customize the color
          },
        });

        primaryMap.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'tiles',
          filter: ['has', 'point_count'],
          paint: {
              // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
              // with three steps to implement three types of circles:
              //   * Blue, 20px circles when point count is less than 100
              //   * Yellow, 30px circles when point count is between 100 and 750
              //   * Pink, 40px circles when point count is greater than or equal to 750
              'circle-color': [
                  'step',
                  ['get', 'point_count'],
                  '#51bbd6',
                  100,
                  '#f1f075',
                  750,
                  '#f28cb1'
              ],
              'circle-radius': [
                  'step',
                  ['get', 'point_count'],
                  40,
                  100,
                  30,
                  750,
                  40
              ]
          }
      });

      
      primaryMap.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'tiles',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    primaryMap.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'tiles',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#11b4da',
            'circle-radius': 10,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });

        // inspect a cluster on click
        primaryMap.on('click', 'clusters', (e) => {
          const features = primaryMap.queryRenderedFeatures(e.point, {
              layers: ['clusters']
          });
          const clusterId = features[0].properties.cluster_id;
          primaryMap.getSource('tiles').getClusterExpansionZoom(
              clusterId,
              (err, zoom) => {
                  if (err) return;

                  primaryMap.easeTo({
                      center: features[0].geometry.coordinates,
                      zoom: zoom
                  });
              }
          );
      });

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      primaryMap.on('click', 'unclustered-point', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const primaryName = e.features[0].properties.primaryName;
          const rank = e.features[0].properties.rank;

          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
              `<div className="text-xl">Latitude: ${coordinates[1].toFixed(2)}</div><br>
              Longitude: ${coordinates[0].toFixed(2)}<br>
              Location: ${primaryName}<br>
              Rank: ${rank}<br>
              <img src="/icons/white/svg/sunny.svg" alt="Description of image">`
    )
          .addTo(primaryMap); 
      });

      primaryMap.on('mouseenter', 'clusters', () => {
        primaryMap.getCanvas().style.cursor = 'pointer';
      });
      primaryMap.on('mouseleave', 'clusters', () => {
        primaryMap.getCanvas().style.cursor = '';
      });
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
      }
    }, []);

  return (
    <section id="section-map" className="h-full">
      <div className="flex items-center h-full justify-center sticky top-0">
        <div id="map" className="w-full h-full m-auto "></div>
        <div id="original-map" className="w-full h-full m-auto hidden"></div>
      </div>
    </section>
  );
};
