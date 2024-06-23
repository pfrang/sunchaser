import {
  useHighlightedCard,
  useMapInstance,
  useMapObject,
} from "states/sunchaser-result";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { useSearchParamsToObject } from "app/hooks/use-search-params";
import { capitalize } from "lodash";
import { useState, useMemo } from "react";
import { useUserLocation } from "app/hooks/use-user-location";
import {
  AzureFunctionCoordinatesMappedItems,
  UserLocation,
} from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { dateFormatter } from "app/utils/date-formatter";

import { ForecastNew } from "./forecast-new";
import { SunchaserResultList } from "./sunchaser-result-list";
import { SunchaserDetailedList } from "./detailed/sunchaser-detailed-list";

export const ListContainer = ({ expandList }) => {
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

  return (
    <>
      <div
        className={`h-full p-2 ${!detailedTableExpanded ? "slide-in" : "slide-out"}`}
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
        className={`absolute top-0 flex w-full p-2 ${detailedTableExpanded ? "slide-in" : "slide-out-2"}`}
      >
        <div className="inline">
          <SunchaserDetailedList
            resetDetailedTable={resetDetailedTable}
            highlightedCard={highlightedCard}
          />
        </div>
      </div>
    </>
  );
};
