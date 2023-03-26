import mapboxgl from "mapbox-gl";

export class MapBoxHelper {
  map: mapboxgl.Map;
  lat: number[];
  lon: number[];
  centerLon?: number;
  centerLat?: number;

  constructor(
    lon?: number[],
    lat?: number[],
    centerLon?: number,
    centerLat?: number
  ) {
    this.lon = lon;
    this.lat = lat;
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

  setMarkers() {
    const marker = this.lon.forEach((lon, index) => {
      new mapboxgl.Marker()
        .setLngLat([this.lon[index], this.lat[index]])
        .addTo(this.map);
    });

    const centerMarker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([this.centerLon, this.centerLat])
      .addTo(this.map);

    return this.map;
  }
}
