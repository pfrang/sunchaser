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
  centerLon?: number;
  centerLat?: number;

  constructor(
    longitudes?: number[],
    latitudes?: number[],
    centerLon?: number,
    centerLat?: number,
  ) {
    this.longitudes = longitudes;
    this.latitudes = latitudes;
    this.centerLon = centerLon;
    this.centerLat = centerLat;
  }

  initializeMap(name: string) {
    const map = new mapboxgl.Map({
      container: name,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.centerLon, this.centerLat],
      zoom: 8,
    });

    this.setMarkers(map);

    return this.setFitBounds(map);
  }

  private setMarkers(map: mapboxgl.Map) {
    const marker = this.longitudes.forEach((lon, index) => {
      const markerElement = new mapboxgl.Marker()
        .setLngLat([this.longitudes[index], this.latitudes[index]])
        .addTo(map)
        .getElement();

      markerElement.addEventListener("mouseenter", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      markerElement.addEventListener("mouseleave", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    const centerMarker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([this.centerLon, this.centerLat])
      .addTo(map);
  }

  setFitBounds(map: mapboxgl.Map) {
    const bounds = new mapboxgl.LngLatBounds();

    this.longitudes.map((longitude, index) => {
      bounds.extend(new mapboxgl.LngLat(longitude, this.latitudes[index]));
    });

    bounds.extend(new mapboxgl.LngLat(this.centerLon, this.centerLat));

    map.fitBounds(bounds, {
      padding: 50,
      duration: 1000,
    });

    return map;
  }

  static fitBounds(
    map: mapboxgl.Map,
    coordinates: StartAndEndCoordinates,
    padding?: number,
    duration?: number,
  ) {
    map.fitBounds(
      [
        [coordinates.start.longitude, coordinates.start.latitude],
        [coordinates.end.longitude, coordinates.end.latitude],
      ],
      { padding, duration },
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
