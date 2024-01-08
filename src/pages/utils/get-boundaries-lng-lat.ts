import { getBoundsOfDistance } from "geolib";
import { LngLatBoundsLike } from "react-map-gl/dist/esm/types";

export class MapboxBoundariesHelper {
  center: { latitude: number; longitude: number };
  radius: number;

  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
  }

  getBoundingBox = () => {
    if (!this.center) return;
    const distance = this.radius * 1000; // Convert km to meters
    const boundingBox = getBoundsOfDistance(this.center, distance);
    const [southWest, northEast] = boundingBox;
    const sw = { latitude: southWest.latitude, longitude: southWest.longitude };
    const ne = { latitude: northEast.latitude, longitude: northEast.longitude };
    return { sw, ne };
  };

  getBoundingBoxLngLatLike = (): LngLatBoundsLike => {
    if (!this.center) return;
    const distance = this.radius * 1000; // Convert km to meters
    const boundingBox = getBoundsOfDistance(this.center, distance);
    const [southWest, northEast] = boundingBox;
    const sw = { latitude: southWest.latitude, longitude: southWest.longitude };
    const ne = { latitude: northEast.latitude, longitude: northEast.longitude };
    return [sw.longitude, sw.latitude, ne.longitude, ne.latitude];
  };
}
