import mapboxgl from "mapbox-gl";

export class MapBoxHelper {
  map: mapboxgl.Map;

  constructor([lat, lon]) {
    this.map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
      // projection: "globe", // display the map as a 3D globe
    });
  }

  setMarker() {
    const marker = new mapboxgl.Marker().setLngLat([-74.5, 40]).addTo(this.map);
    const marker2 = new mapboxgl.Marker().setLngLat([-74, 40]).addTo(this.map);
    return this.map;
  }
}
