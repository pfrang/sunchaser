import mapboxgl from "mapbox-gl";

export class MapBoxHelper {
  map: mapboxgl.Map;
  lat: number;
  lon: number;

  constructor([lon, lat]) {
    this.lat = lat;
    this.lon = lon;
    this.map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [lon, lat], // starting position [lng, lat]
      zoom: 10, // starting zoom
      // projection: "globe", // display the map as a 3D globe
    });
  }

  setMarker() {
    const marker = new mapboxgl.Marker()
      .setLngLat([this.lon, this.lat])
      .addTo(this.map);
    return this.map;
  }
}
