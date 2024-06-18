"use client";
import { create } from "zustand";
import { MapBoxHelper } from "app/utils/mapbox-settings";

import { AzureFunctionCoordinatesMappedItems } from "../app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

export interface DisplayMap {
  mapObject: undefined | mapboxgl.Map;
  setMapObject: (input: mapboxgl.Map) => void;
}

export interface DisplayMapInstance {
  mapInstance: undefined | MapBoxHelper;
  setMapInstance: (input: MapBoxHelper) => void;
}

export interface HighlightedCard {
  highlightedCard: undefined | AzureFunctionCoordinatesMappedItems;
  setHighlightedCard: (
    input: AzureFunctionCoordinatesMappedItems | undefined,
  ) => void;
}

export const useMapObject = create<DisplayMap>((set) => ({
  mapObject: undefined,
  setMapObject: (input: mapboxgl.Map) => set(() => ({ mapObject: input })),
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
