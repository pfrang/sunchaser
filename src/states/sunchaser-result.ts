import { create } from "zustand";

import { MapBoxHelper } from "../pages/utils/mapbox-settings";
import { AzureFunctionCoordinatesMappedItems } from "../pages/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

export interface DisplayMap {
  mapObject: undefined | mapboxgl.Map;
  setMap: (input: mapboxgl.Map) => void;
}

export interface DisplayMapInstance {
  mapInstance: undefined | MapBoxHelper;
  setMapInstance: (input: MapBoxHelper) => void;
}

export interface HighlightedCard {
  highlightedCard: undefined | AzureFunctionCoordinatesMappedItems;
  setHighlightedCard: (input: AzureFunctionCoordinatesMappedItems) => void;
}

export const useMap = create<DisplayMap>((set) => ({
  mapObject: undefined,
  setMap: (input: mapboxgl.Map) => set(() => ({ mapObject: input })),
}));

export const useMapInstance = create<DisplayMapInstance>((set) => ({
  mapInstance: undefined,
  setMapInstance: (input: MapBoxHelper) => set(() => ({ mapInstance: input })),
}));

export const useHighlightedCard = create<HighlightedCard>((set) => ({
  highlightedCard: undefined,
  setHighlightedCard: (input: AzureFunctionCoordinatesMappedItems) =>
    set(() => ({ highlightedCard: input })),
}));