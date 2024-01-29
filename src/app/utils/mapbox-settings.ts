import { AzureFunctionCoordinatesMappedItems } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import mapboxgl from "mapbox-gl";

interface Coordinates {
  longitude: number;
  latitude: number;
}

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
  ranks: AzureFunctionCoordinatesMappedItems[];

  constructor(
    centerLon: number,
    centerLat: number,
    ranks: AzureFunctionCoordinatesMappedItems[],
    name: string = "map",
  ) {
    this.centerLon = centerLon;
    this.centerLat = centerLat;
    this.ranks = ranks;

    this.longitudes = ranks.map((item) => item.longitude);
    this.latitudes = ranks.map((item) => item.latitude);
    this.map = new mapboxgl.Map({
      container: name,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.centerLon, this.centerLat],
      zoom: 8,
    });
  }

  initializeMap() {
    this.setMarkers();

    this.setFitBounds();
  }

  addSourceSettings() {
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
      clusterMaxZoom: 15,
      clusterRadius: 200,
    });
  }

  addCluster() {
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
        "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
      },
    });

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

  addClickHandlers() {
    this.map.on("click", "clusters", (e) => {
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
        },
      );
    });

    // TODO fix any
    this.map.on("click", "unclustered-point", (e: any) => {
      const coordinates = e?.features[0]?.geometry?.coordinates?.slice();
      const primaryName = e?.features[0]?.properties?.primaryName;
      const rank = e?.features[0]?.properties?.rank;

      // Ensure that if the map is zoomed out such that
      // multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(
          `Latitude: ${coordinates[1].toFixed(2)}<br>
              Longitude: ${coordinates[0].toFixed(2)}<br>
              Location: ${primaryName}<br>
              Rank: ${rank}<br>
              <img src="/icons/white/svg/sunny.svg" alt="Description of image">`,
        )
        .addTo(this.map);
    });

    // TODO add cursor pointer for unclustered point

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

    // only sets user location

    new mapboxgl.Marker({ color: "red" })
      .setLngLat([this.centerLon, this.centerLat])
      .addTo(this.map);
  }

  setFitBounds() {
    const bounds = new mapboxgl.LngLatBounds();

    this.longitudes.map((longitude, index) => {
      bounds.extend(new mapboxgl.LngLat(longitude, this.latitudes[index]));
    });

    bounds.extend(new mapboxgl.LngLat(this.centerLon, this.centerLat));

    this.map.fitBounds(bounds, {
      padding: 50,
      duration: 1000,
    });

    return this.map;
  }

  fitBounds(
    coordinates: StartAndEndCoordinates,
    padding: number = 4,
    duration: number = 4,
  ) {
    this.map.fitBounds(
      [
        [coordinates.start.longitude, coordinates.start.latitude],
        [coordinates.end.longitude, coordinates.end.latitude],
      ],
      { padding, duration },
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
