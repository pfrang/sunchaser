import { getBoundsOfDistance } from "geolib";
import { LngLatBoundsLike } from "react-map-gl/dist/esm/types";

export const getBoundingBox = (center, radius) => {
  if (!center) return;
  const distance = radius * 1000; // Convert km to meters
  const boundingBox = getBoundsOfDistance(center, distance);
  const [southWest, northEast] = boundingBox;
  const sw = { latitude: southWest.latitude, longitude: southWest.longitude };
  const ne = { latitude: northEast.latitude, longitude: northEast.longitude };
  return { sw, ne };
};

export const getBoundingBoxLngLatLike = (center, radius): LngLatBoundsLike => {
  if (!center) return;
  const distance = radius * 1000; // Convert km to meters
  const boundingBox = getBoundsOfDistance(center, distance);
  const [southWest, northEast] = boundingBox;
  const sw = { latitude: southWest.latitude, longitude: southWest.longitude };
  const ne = { latitude: northEast.latitude, longitude: northEast.longitude };
  return [sw.longitude, sw.latitude, ne.longitude, ne.latitude];
};
