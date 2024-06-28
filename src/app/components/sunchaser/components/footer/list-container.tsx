import {
  useHighlightedCard,
  useMapInstance,
  useMapObject,
} from "states/sunchaser-result";
import { useSearchParamsToObject } from "app/hooks/use-search-params";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useUserLocation } from "app/hooks/use-user-location";
import {
  AzureFunctionCoordinatesMappedItems,
  Times,
  UserLocation,
} from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { dateFormatter } from "app/utils/date-formatter";
import { ForecastDay } from "app/api/forecast/mapper/forecast-mapper";
import { splitTimesIntoDays } from "app/utils/times-helper";
import { useForecast } from "app/hooks/use-forecast";
import { TimeTable } from "ui-kit/list-item/list-item-detailed";

import { ForecastNew } from "./forecast-new";
import { SunchaserResultList } from "./sunchaser-result-list";
import { ListWrapper } from "./detailed/list-wrapper";
import { TableItemWrapper } from "./detailed/table-item-wrapper";

type ExpandedTable = "sunchaser" | "forecast";

export const ListContainer = ({ parentRef, isAtMaxHeight, expandList }) => {
  const { highlightedCard, setHighlightedCard } = useHighlightedCard();

  const [expandDetailedTable, setExpandDetailedTable] =
    useState<ExpandedTable | null>("sunchaser");

  const searchParams = useSearchParamsToObject();
  const [detailedTableExpanded, setDetailedTableExpanded] = useState(false);
  const { mapInstance } = useMapInstance();

  const { userLocation } = useUserLocation() as { userLocation: UserLocation };

  const dateDisplay = useMemo(() => {
    const date = new Date(searchParams?.date || new Date());
    return dateFormatter(date);
  }, [searchParams?.date]);

  const { data, isLoading, error } = useForecast({
    params: searchParams,
  });

  const toggleDetailedTable = (
    item: AzureFunctionCoordinatesMappedItems | ForecastDay,
  ) => {
    expandList();
    if (
      item !== highlightedCard &&
      isAzureFunctionCoordinatesMappedItems(item)
    ) {
      setHighlightedCard(item);
      setExpandDetailedTable("sunchaser");
    } else if (!isAzureFunctionCoordinatesMappedItems(item)) {
      setExpandDetailedTable("forecast");
    }
    setDetailedTableExpanded(true);
  };

  const resetDetailedTable = () => {
    setDetailedTableExpanded(false);
    resetMap();
  };

  const { mapObject } = useMapObject();

  const resetMap = () => {
    if (mapObject && mapInstance) {
      mapInstance.removeLayer("route");
      mapObject.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        duration: 500,
      });
      mapInstance.setFitBounds();
    }
  };

  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.scrollTop = 0;
    }
  }, [detailedTableExpanded]);

  const renderSunchaserTable = useCallback(() => {
    if (highlightedCard) {
      const days = splitTimesIntoDays(highlightedCard?.times);
      return (
        <>
          {Object.values(days).map((day, index) => {
            return <TableItemWrapper key={index} day={day} />;
          })}
        </>
      );
    } else {
      return <></>;
    }
  }, [highlightedCard?.times]);

  const renderForecastTable = useCallback(() => {
    if (data) {
      const days = Object.values(data.days);

      return (
        <>
          {days.map((day) => {
            const date = dateFormatter(new Date(day.overview.date));
            const times: Times[] = day.times.map((time) => {
              return {
                temperature: time.temperature || 0,
                rain: time.rain || 0,
                wind: time.wind || 0,
                symbol: time.symbol || "sun",
                time: time.time,
                date: new Date(day.overview.date),
              } as Times;
            });

            return <TableItemWrapper key={day.overview.date} day={times} />;
          })}
        </>
      );
    } else {
      return <></>;
    }
  }, [data]);

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
          <ForecastNew toggleDetailedTable={toggleDetailedTable} />
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
          {expandDetailedTable === "sunchaser" && highlightedCard?.date && (
            <ListWrapper
              location={highlightedCard.primaryName}
              resetDetailedTable={resetDetailedTable}
              renderTable={renderSunchaserTable}
            />
          )}
          {expandDetailedTable === "forecast" && (
            <ListWrapper
              location={searchParams?.location || "Min lokasjon"}
              resetDetailedTable={resetDetailedTable}
              renderTable={renderForecastTable}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// typeguard check for AzureFunctionCoordinatesMappedItems
function isAzureFunctionCoordinatesMappedItems(
  item: AzureFunctionCoordinatesMappedItems | ForecastDay,
): item is AzureFunctionCoordinatesMappedItems {
  return (
    (item as AzureFunctionCoordinatesMappedItems).primaryName !== undefined
  );
}
