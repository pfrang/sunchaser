import { AzureFunctionCoordinatesMappedItems } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import { Units } from "@turf/turf";
import { isNaN } from "lodash";
interface Coordinates {
  longitude: number;
  latitude: number;
}

const layers = ["clusters", "cluster-count", "unclustered-point", "route"];

export interface StartAndEndCoordinates {
  start: Coordinates;
  end: Coordinates;
}

export class MapBoxHelper {
  map: mapboxgl.Map;
  originalMap: mapboxgl.Map;
  latitudes: number[];
  longitudes: number[];
  centerLon: number;
  centerLat: number;
  userLocationLon: number;
  userLocationLat: number;
  originalLon: number;
  originalLat: number;
  ranks: AzureFunctionCoordinatesMappedItems[];
  currentPopup: mapboxgl.Popup | null = null;
  private marker: mapboxgl.Marker | null = null;

  constructor(
    centerLon: number,
    centerLat: number,
    userLocationLon: number,
    userLocationLat: number,
    ranks: AzureFunctionCoordinatesMappedItems[],
    name: string = "map"
  ) {
    this.centerLon = centerLon;
    this.centerLat = centerLat;
    this.userLocationLon = userLocationLon;
    this.userLocationLat = userLocationLat;
    this.originalLon = centerLon;
    this.originalLat = centerLat;
    this.marker = null;
    this.ranks = ranks;

    this.longitudes = ranks.map((item) => item.longitude);
    this.latitudes = ranks.map((item) => item.latitude);
    this.map = new mapboxgl.Map({
      container: name,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.centerLon, this.centerLat],
      zoom: 8,
    });

    new mapboxgl.Marker({ color: "red" })
      .setLngLat([this.userLocationLon, this.userLocationLat])
      .addTo(this.map);
  }

  private sameToDecimals(a: number, b: number, decimals: number = 4): boolean {
    const f = 10 ** decimals;
    return Math.trunc(a * f) === Math.trunc(b * f);
  }

  setMarker() {
    if (
      !this.sameToDecimals(this.userLocationLat, this.centerLat, 2) &&
      !this.sameToDecimals(this.userLocationLon, this.centerLon, 2)
    ) {
      new mapboxgl.Marker({ color: "blue" })
        .setLngLat([this.originalLon, this.originalLat])
        .addTo(this.map);
    }
  }

  setSearchMarker() {
    if (this.marker) {
      this.marker.remove(); // Remove existing marker
    }
    this.marker = new mapboxgl.Marker({ color: "green" })
      .setLngLat([this.centerLon, this.centerLat])
      .addTo(this.map);
  }

  setLatLon(centerLon: number, centerLat: number) {
    this.centerLon = centerLon;
    this.centerLat = centerLat;
    this.map.setCenter([this.centerLon, this.centerLat]);
  }

  removeMarker() {
    if (this.marker) {
      this.marker.remove();
      this.marker = null;
    }
  }

  sourceAndLayerAfterLoad() {
    this.addSourceSettings();
    this.addCluster();
    // mapInitializer.addHeatMap();
    this.addClickHandlers();
  }

  flyToUserLocation(zoom: number = 8) {
    this.map.flyTo({
      center: [this.userLocationLon, this.userLocationLat],
      duration: 500,
      zoom: zoom,
    });
  }

  flyToDataLocation(zoom: number = 8) {
    this.map.flyTo({
      center: [this.originalLon, this.originalLat],
      duration: 700,
      zoom: zoom,
    });
  }

  removePopup() {
    if (this.currentPopup) {
      this.currentPopup.remove();
      this.currentPopup = null;
    }
  }

  resetMap() {
    this.map.flyTo({
      center: [this.originalLon, this.originalLat],
      zoom: 8,
    });
    // only remove if exist

    this.removePopup();
    // remove any popup

    layers.forEach((layer) => {
      if (this.map.getLayer(layer)) {
        this.map.removeLayer(layer);
      }
    });
  }

  removeLayer(layer: string) {
    if (this.map.getLayer(layer)) {
      this.map.removeLayer(layer);
    }
  }

  adjustStyle(input: string) {
    this.map.setStyle(input);
    this.map.on("style.load", () => {
      this.sourceAndLayerAfterLoad();
    });
  }

  addCircularMap(distance: number | string | undefined) {
    if (isNaN(Number(distance))) {
      return;
    }
    const _center = turf.point([this.centerLon, this.centerLat]);
    const _radius = distance as number;
    const _options = {
      steps: 80,
      units: "kilometers" as Units,
    };
    const _circle = turf.circle(_center, _radius, _options);

    if (!this.map.getSource("circleData")) {
      this.map.addSource("circleData", {
        type: "geojson",
        data: _circle,
      });
    }
    if (!this.map.getLayer("circle-fill")) {
      this.map.addLayer({
        id: "circle-fill",
        type: "fill",
        source: "circleData",
        paint: {
          "fill-color": "#2C5C32",
          "fill-opacity": 0.1,
        },
      });
    }
  }

  updateBounds = (newRadius?: number) => {
    const circle = turf.circle(
      [Number(this.centerLon), Number(this.centerLat)],
      newRadius,
      { units: "kilometers" }
    );

    const bounds = circle.geometry.coordinates[0].reduce(
      function (bounds, coord) {
        return bounds.extend(coord as any);
      },
      new mapboxgl.LngLatBounds(
        circle.geometry.coordinates[0][0] as any,
        circle.geometry.coordinates[0][0] as any
      )
    );

    this.map.fitBounds(bounds, {
      padding: 80,
      duration: 1000,
    });
  };

  updateCircularMap(distance: number | string | undefined) {
    if (isNaN(Number(distance))) {
      return;
    }

    const _center = turf.point([this.centerLon, this.centerLat]);
    const _radius = distance as number;
    const _options = {
      steps: 80,
      units: "kilometers" as Units,
    };
    const _circle = turf.circle(_center, _radius, _options);

    // Update the data of the existing source
    if (this.map.getSource("circleData")) {
      (this.map.getSource("circleData") as mapboxgl.GeoJSONSource).setData(
        _circle
      );
    }
  }

  removeCircularMap() {
    if (this.map.getLayer("circle-fill")) {
      this.map.removeLayer("circle-fill");
    }
    if (this.map.getSource("circleData")) {
      this.map.removeSource("circleData");
    }
  }

  addSourceSettings() {
    if (!this.map.getSource("tiles")) {
      this.map.addSource("tiles", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: this.longitudes.map((lon, index) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [lon, this.latitudes[index]],
            },
            properties: {
              primaryName: this.ranks[index].primaryName,
              rank: this.ranks[index].rank,
              // TODO add symbol
            },
          })),
        },
        cluster: true,
        clusterMaxZoom: 7,
        clusterRadius: 140,
      });
    }
  }

  addCluster() {
    if (!this.map.getLayer("clusters")) {
      this.map.addLayer({
        id: "clusters",
        type: "circle",
        source: "tiles",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#E7E621",
            100, // when 100 different points / locations
            "#f1f075",
            750, // when 750 different points / locations
            "#f28cb1",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });
    }

    if (!this.map.getLayer("cluster-count")) {
      this.map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "tiles",
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count_abbreviated"],
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 20,
        },
      });
    }

    if (!this.map.getLayer("unclustered-point")) {
      this.map.addLayer({
        id: "unclustered-point",
        type: "circle",
        source: "tiles",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#E7E621",
          "circle-radius": 15,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });
    }
  }

  addHeatMap() {
    this.map.addLayer({
      id: "heatmap",
      type: "heatmap",
      source: "tiles",
      paint: {
        // Increase the heatmap weight based on frequency and property magnitude
        "heatmap-weight": {
          property: "rank",
          type: "exponential",
          stops: [
            [0, 0],
            [1, 1],
          ],
        },
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        // "heatmap-intensity": {
        //   stops: [
        //     [11, 1],
        //     [15, 3],
        //   ],
        // },
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparancy color
        // to create a blur-like effect.
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0,
          "rgba(162,164,89,0)",
          0.2,
          "rgb(192,195,77)",
          0.4,
          "rgb(209,229,240)",
          0.6,
          "rgb(206,210,60)",
          0.8,
          "rgb(225,230,49)",
          1,
          "rgb(243,248,42)",
        ],
        // Adjust the heatmap radius by zoom level
        "heatmap-radius": 100,
        // Transition from heatmap to circle layer by zoom level
        // "heatmap-opacity": {
        //   default: 1,
        //   stops: [
        //     [14, 1],
        //     [15, 0],
        //   ],
        // },
      },
    });
  }

  addClickHandlers() {
    const handleClusterClick = (
      e: mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent
    ) => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      const clusterId = features[0]?.properties?.cluster_id;
      (this.map.getSource("tiles") as any).getClusterExpansionZoom(
        clusterId,
        (err, zoom) => {
          if (err) return;

          this.map.easeTo({
            center: (features[0].geometry as any).coordinates as any,
            zoom: zoom,
          });
        }
      );
    };

    // Add both click and touchend handlers
    this.map.on("click", "clusters", handleClusterClick);
    this.map.on("touchend", "clusters", handleClusterClick);

    const handleUnclusteredPointClick = (
      e: mapboxgl.MapMouseEvent | mapboxgl.MapTouchEvent
    ) => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ["unclustered-point"],
      });
      if (features.length) {
        let coordinates: number[] = [];
        if (features[0].geometry.type === "Point") {
          coordinates = (
            features[0].geometry as turf.Point
          ).coordinates.slice();
        }
        const primaryName = features[0].properties?.primaryName;
        const rank = features[0].properties?.rank;

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        this.removePopup();

        this.currentPopup = new mapboxgl.Popup()
          .setLngLat([coordinates[0], coordinates[1]] as [number, number])
          .setHTML(
            `
              <h3 style="margin: 0; font-size: 16px; color: #333;">${primaryName}</h3>
              <p style="margin: 5px 0; font-size: 14px; color: #555;">
                <strong>Latitude:</strong> ${coordinates[1].toFixed(2)}<br>
                <strong>Longitude:</strong> ${coordinates[0].toFixed(2)}<br>
                <strong>Rank:</strong> ${rank}
              </p>
              <img src="/icons/white/svg/sunny.svg" alt="Description of image" style="width: 50px; height: 50px; margin-top: 10px;">
              <button id="popup-close-btn" style="margin-top: 10px; padding: 5px 10px; font-size: 14px; color: #fff; background-color: #d9534f; border: none; border-radius: 4px; cursor: pointer;">
                Close
              </button>
    `
          )
          .addTo(this.map);

        setTimeout(() => {
          const popupElement = document.getElementById("popup-close-btn");
          popupElement?.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent event propagation
            this.removePopup(); // Remove the popup
          });
        }, 0);

        this.map.easeTo({
          center: (features[0].geometry as any).coordinates as any,
          // zoom: 8,
        });
      }
    };

    // Add both click and touchend handlers
    this.map.on("click", "unclustered-point", handleUnclusteredPointClick);
    this.map.on("touchend", "unclustered-point", handleUnclusteredPointClick);

    this.map.on("mouseenter", "clusters", () => {
      this.map.getCanvas().style.cursor = "pointer";
    });

    this.map.on("mouseleave", "clusters", () => {
      this.map.getCanvas().style.cursor = "";
    });
  }

  private setMarkers() {
    // this.longitudes.forEach((lon, index) => {
    //   const markerElement = new mapboxgl.Marker()
    //     .setLngLat([this.longitudes[index], this.latitudes[index]])
    //     .addTo(this.map)
    //     .getElement();
    //   markerElement.addEventListener("mouseenter", () => {
    //     this.map.getCanvas().style.cursor = "pointer";
    //   });
    //   markerElement.addEventListener("mouseleave", () => {
    //     this.map.getCanvas().style.cursor = "";
    //   });
    // });
  }

  setFitBounds() {
    const bounds = new mapboxgl.LngLatBounds();

    this.longitudes.map((longitude, index) => {
      bounds.extend(new mapboxgl.LngLat(longitude, this.latitudes[index]));
    });

    bounds.extend(new mapboxgl.LngLat(this.centerLon, this.centerLat));

    this.map.fitBounds(bounds, {
      padding: 60,
      duration: 1000,
    });

    return this.map;
  }

  fitBounds(
    coordinates: StartAndEndCoordinates,
    padding: number = 4,
    duration: number = 4
  ) {
    this.map.fitBounds(
      [
        [coordinates.start.longitude, coordinates.start.latitude],
        [coordinates.end.longitude, coordinates.end.latitude],
      ],
      { padding, duration }
    );
  }

  drawLine(coordinates: StartAndEndCoordinates) {
    if (this.map.getLayer("route")) {
      this.map.removeLayer("route");
    }

    if (this.map.getSource("route")) {
      this.map.removeSource("route");
    }

    this.map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: [
                  [coordinates.start.longitude, coordinates.start.latitude],
                  [coordinates.end.longitude, coordinates.end.latitude],
                ],
              },
              properties: {
                title: "Something",
              },
            },
          ],
        },
      },
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#000",
        "line-opacity": 0.8,
        "line-width": 4,
        "line-dasharray": [4, 2],
      },
    });
  }
}
