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
  DrawerTrigger,
} from "@/components/ui/drawer";
import { snapPoints } from "./footer";
import { useState } from "react";

type ExpandedTable = "sunchaser" | "forecast";

type Props = {
  parentRef: React.RefObject<HTMLDivElement | null>;
  isAtMaxHeight: boolean;
  expandList: () => void;
  middleList: () => void;
};

export const ListContainer = ({
  parentRef,
  isAtMaxHeight,
  expandList,
  middleList,
}: Props) => {
  const { highlightedCard, setHighlightedCard } = useHighlightedCard();

  const [snap, setSnap] = useState<number | string | null>(null);
  const { mapInstance } = useMapInstance();
  const { userLocation } = useUserLocation() as { userLocation: UserLocation };

  const toggleDetailedTable = (
    item: AzureFunctionCoordinatesMappedItems | ForecastDay
  ) => {
    setSnap(snapPoints[1]);
    if (
      item !== highlightedCard &&
      isAzureFunctionCoordinatesMappedItems(item)
    ) {
      setHighlightedCard(item);
    } else if (!isAzureFunctionCoordinatesMappedItems(item)) {
      setHighlightedCard(undefined);
      mapInstance?.flyToDataLocation(11);
    }
  };

  const { mapObject } = useMapObject();

  const resetMap = () => {
    if (mapObject && mapInstance && userLocation?.longitude) {
      mapInstance.removeLayer("route");
      mapObject.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        duration: 500,
      });
      mapInstance.setFitBounds();
    }
  };

  const resetDetailedTable = () => {
    // setDetailedTableExpanded(false); // this starts the slide-out

    requestAnimationFrame(() => resetMap());
  };

  console.log("snap", snap);
  return (
    <>
      <Drawer
        snapPoints={[snapPoints[1], snapPoints[2]]}
        activeSnapPoint={snap}
        setActiveSnapPoint={setSnap}
        shouldScaleBackground={false}
        modal={false}
      >
        <div className="py-4">
          <ForecastNew toggleDetailedTable={toggleDetailedTable} />
        </div>
        <span className="block h-4 border-b-4 border-greens-600"></span>
        <div className="py-4">
          <SunchaserResultList toggleDetailedTable={toggleDetailedTable} />
        </div>

        <DrawerHeader>
          <DrawerTitle className="hidden"></DrawerTitle>
          <DrawerPortal>
            <DrawerContent
              noOverlay
              noPortal
              className="w-full rounded-custom border-green-100 flex"
            >
              <ListWrapper expandList={expandList} />
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
