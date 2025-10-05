import {
  useHighlightedCard,
  useMapInstance,
  useMapObject,
} from "states/sunchaser-result";
import { useUserLocation } from "app/hooks/use-user-location";
import {
  AzureFunctionCoordinatesMappedItems,
  UserLocation,
} from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { ForecastDay } from "app/api/forecast/mapper/forecast-mapper";

import { ForecastNew } from "./forecast-new";
import { SunchaserResultList } from "./sunchaser-result-list";
import { ListWrapper } from "./detailed/list-wrapper";
import { CarouselContent, CarouselItem } from "ui-kit/carousel/Carousel";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
} from "@/components/ui/drawer";
import { snapPoints } from "./footer";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsSettingsOpen } from "states/states";
import { MapChooser } from "./map-chooser";
import { MapOptionsEnum } from "./settings-form-values";

type Props = {
  isAtMaxHeight: boolean;
  middleList: () => void;
};

export const NestedDrawer = ({ isAtMaxHeight, middleList }: Props) => {
  const { highlightedCard, setHighlightedCard } = useHighlightedCard();

  const [snap, setSnap] = useState<number | string | null>(null);
  const { mapInstance } = useMapInstance();
  const { userLocation } = useUserLocation() as { userLocation: UserLocation };

  const toggleDetailedTable = (
    item: AzureFunctionCoordinatesMappedItems | ForecastDay
  ) => {
    middleList();
    setSnap(snapPoints[1]);
    if (
      item !== highlightedCard &&
      isAzureFunctionCoordinatesMappedItems(item)
    ) {
      setHighlightedCard(item);
    } else if (!isAzureFunctionCoordinatesMappedItems(item)) {
      setHighlightedCard(undefined);
      requestAnimationFrame(() => mapInstance?.flyToDataLocation(11));
    }
  };

  const { mapObject } = useMapObject();

  const resetDetailedTable = () => {
    requestAnimationFrame(() => resetMap());
  };

  const resetMap = () => {
    if (mapObject && mapInstance && userLocation?.longitude) {
      mapInstance.removeLayer("route");
      mapObject.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        duration: 700,
      });
      mapInstance.setFitBounds();
    }
  };

  const expandList = () => setSnap(snapPoints[2]);

  return (
    <>
      <Drawer
        snapPoints={[snapPoints[1], snapPoints[2]]}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        shouldScaleBackground={false}
        modal={false}
        onClose={resetDetailedTable}
        nested
      >
        <div className="flex flex-col h-full w-full min-h-0">
          <div className="py-4">
            <ForecastNew toggleDetailedTable={toggleDetailedTable} />
          </div>
          <span className="block h-4 border-b-4 border-greens-600"></span>
          <div
            className={cn("flex-1 min-h-0  py-4 pb-32", {
              "overflow-y-auto": isAtMaxHeight,
            })}
          >
            <SunchaserResultList toggleDetailedTable={toggleDetailedTable} />
          </div>
        </div>

        <DrawerHeader>
          <DrawerTitle className="hidden"></DrawerTitle>
          <DrawerPortal>
            <DrawerContent
              noOverlay
              noPortal
              data-testid="detailed-table"
              className="h-full"
            >
              <ListWrapper
                isAtMaxHeight={snap === snapPoints[2]}
                expandList={expandList}
              />
            </DrawerContent>
          </DrawerPortal>
        </DrawerHeader>
      </Drawer>
    </>
  );
};

// typeguard check for AzureFunctionCoordinatesMappedItems
function isAzureFunctionCoordinatesMappedItems(
  item: AzureFunctionCoordinatesMappedItems | ForecastDay
): item is AzureFunctionCoordinatesMappedItems {
  return (
    (item as AzureFunctionCoordinatesMappedItems).primaryName !== undefined
  );
}
