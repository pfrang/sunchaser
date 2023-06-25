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
  latitudes: number[];
  longitudes: number[];
  centerLon?: number;
  centerLat?: number;

  constructor(
    longitudes?: number[],
    latitudes?: number[],
    centerLon?: number,
    centerLat?: number
  ) {
    this.longitudes = longitudes;
    this.latitudes = latitudes;
    this.centerLon = centerLon;
    this.centerLat = centerLat;
    this.map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [this.centerLon, this.centerLat], // starting position [lng, lat]
      zoom: 8, // starting zoom
      // projection: "globe", // display the map as a 3D globe
    });
  }

  setMarkersAndFitBounds() {
    const marker = this.longitudes.forEach((lon, index) => {
      new mapboxgl.Marker()
        .setLngLat([this.longitudes[index], this.latitudes[index]])
        .addTo(this.map);
    });

    const centerMarker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([this.centerLon, this.centerLat])
      .addTo(this.map);

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

  static fitBounds(
    map: mapboxgl.Map,
    coordinates: StartAndEndCoordinates,
    padding?: number,
    duration?: number
  ) {
    map.fitBounds(
      [
        [coordinates.start.longitude, coordinates.start.latitude],
        [coordinates.end.longitude, coordinates.end.latitude],
      ],
      { padding, duration }
    );
  }

  static drawLine(map: mapboxgl.Map, coordinates: StartAndEndCoordinates) {
    if (map.getLayer("route")) {
      map.removeLayer("route");
    }

    if (map.getSource("route")) {
      map.removeSource("route");
    }

    map.addLayer({
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
                title: "Somethign",
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
