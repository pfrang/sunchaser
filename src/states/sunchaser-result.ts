import { create } from "zustand";

import { MapBoxHelper } from "../pages/utils/mapbox-settings";

export interface DisplayMap {
  mapObject: undefined | mapboxgl.Map;
  setMap: (input: mapboxgl.Map) => void;
}

export interface DisplayMapInstance {
  mapInstance: undefined | MapBoxHelper;
  setMapInstance: (input: MapBoxHelper) => void;
}

export const useMap = create<DisplayMap>((set) => ({
  mapObject: undefined,
  setMap: (input: mapboxgl.Map) => set(() => ({ mapObject: input })),
}));

export const useMapInstance = create<DisplayMapInstance>((set) => ({
  mapInstance: undefined,
  setMapInstance: (input: MapBoxHelper) => set(() => ({ mapInstance: input })),
}));
