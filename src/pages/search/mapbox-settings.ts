import mapboxgl from "mapbox-gl";

export class MapBoxHelper {
  map: mapboxgl.Map;
  lat: number[];
  lon: number[];

  constructor(
    lon?: number[],
    lat?: number[],
    centerLon?: number,
    centerLat?: number
  ) {
    this.lon = lon;
    this.lat = lat;
    this.map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [lon[0], lat[0]], // starting position [lng, lat]
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

    return this.map;
  }
}
