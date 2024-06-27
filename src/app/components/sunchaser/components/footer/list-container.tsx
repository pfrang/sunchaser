import {
  useHighlightedCard,
  useMapInstance,
  useMapObject,
} from "states/sunchaser-result";
import { useSearchParamsToObject } from "app/hooks/use-search-params";
import { useState, useMemo, useEffect } from "react";
import { useUserLocation } from "app/hooks/use-user-location";
import {
  AzureFunctionCoordinatesMappedItems,
  UserLocation,
} from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { dateFormatter } from "app/utils/date-formatter";

import { ForecastNew } from "./forecast-new";
import { SunchaserResultList } from "./sunchaser-result-list";
import { SunchaserDetailedList } from "./detailed/sunchaser-list-wrapper";

export const ListContainer = ({ parentRef, isAtMaxHeight, expandList }) => {
  const { highlightedCard, setHighlightedCard } = useHighlightedCard();

  const searchParams = useSearchParamsToObject();
  const [detailedTableExpanded, setDetailedTableExpanded] = useState(false);
  const { mapInstance } = useMapInstance();

  const { userLocation } = useUserLocation() as { userLocation: UserLocation };

  const dateDisplay = useMemo(() => {
    const date = new Date(searchParams?.date || new Date());
    return dateFormatter(date);
  }, [searchParams?.date]);

  const toggleDetailedTable = (item: AzureFunctionCoordinatesMappedItems) => {
    expandList();
    setHighlightedCard(item);
    setDetailedTableExpanded(true);
  };

  const resetDetailedTable = () => {
    setDetailedTableExpanded(false);
    resetMap();
  };

  const { mapObject } = useMapObject();

  const resetMap = () => {
    if (mapObject) {
      mapObject.removeLayer("route");
      mapObject.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        duration: 500,
      });
      mapInstance?.setFitBounds();
    }
  };

  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.scrollTop = 0;
    }
  }, [detailedTableExpanded]);

  return (
    <div
      ref={parentRef}
      style={{
        height: `100%`,
        overflowY: isAtMaxHeight ? "auto" : "hidden",
        overflowX: "hidden",
        position: detailedTableExpanded ? "relative" : "initial",
      }}
      className={"scrollbar-thin scrollbar-track-slate-50"}
    >
      <div
        className={`p-2 pb-12 transition-all duration-500 ease-in-out ${!detailedTableExpanded ? "translate-x-0" : "h-0 -translate-x-full"}`}
      >
        <div>
          <p className="text-variant-regular text-xl">{dateDisplay}</p>
          <span className="block h-4 border-b-4 border-greens-600"></span>
        </div>
        <div className="flex gap-4">
          <ForecastNew setDetailedTableExpanded={toggleDetailedTable} />
        </div>
        <span className="block h-4 border-b-4 border-greens-600"></span>
        <div className="py-4">
          <SunchaserResultList toggleDetailedTable={toggleDetailedTable} />
        </div>
      </div>
      <div
        className={`absolute top-0 p-2 pb-14 transition-all duration-500 ease-in-out ${detailedTableExpanded ? "translate-x-0" : "h-0 translate-x-full"}`}
      >
        <div className="inline">
          <SunchaserDetailedList
            resetDetailedTable={resetDetailedTable}
            highlightedCard={highlightedCard}
          />
        </div>
      </div>
    </div>
  );
};
