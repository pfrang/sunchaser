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

const useMap = create<DisplayMap>((set) => ({
  mapObject: undefined,
  setMap: (input: mapboxgl.Map) => set(() => ({ mapObject: input })),
}));

const useMapInstance = create<DisplayMapInstance>((set) => ({
  mapInstance: undefined,
  setMapInstance: (input: MapBoxHelper) => set(() => ({ mapInstance: input })),
}));

const useHighlightedCard = create<HighlightedCard>((set) => ({
  highlightedCard: undefined,
  setHighlightedCard: (input: AzureFunctionCoordinatesMappedItems) =>
    set(() => ({ highlightedCard: input })),
}));

export abstract class StateHelper {
  static useMap = useMap;
  static useMapInstance = useMapInstance;
  static useHighlightedCard = useHighlightedCard;

  static mapObject = () => {
    return {
      mapObject: StateHelper.useMap.getState().mapObject,
      setMapObject: (input: mapboxgl.Map) =>
        StateHelper.useMap.setState({ mapObject: input }),
    };
  };

  static mapInstance = () => {
    return {
      mapInstance: StateHelper.useMapInstance.getState().mapInstance,
      setMapInstance: (input: MapBoxHelper) =>
        StateHelper.useMapInstance.setState({
          mapInstance: input,
        }),
    };
  };

  static highlightedCard = () => {
    return {
      highlightedCard:
        StateHelper.useHighlightedCard.getState().highlightedCard,
      setHighlightedCard: (input: AzureFunctionCoordinatesMappedItems) =>
        StateHelper.useHighlightedCard.setState({
          highlightedCard: input,
        }),
    };
  };
}
