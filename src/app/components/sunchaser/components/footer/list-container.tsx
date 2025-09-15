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

import { ForecastNew } from "./forecast-new";
import { SunchaserResultList } from "./sunchaser-result-list";
import { ListWrapper } from "./detailed/list-wrapper";
import { TableItemWrapper } from "./detailed/table-item-wrapper";

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

  const [tableDisplay, setTableDisplay] = useState<ExpandedTable | null>(
    "forecast"
  );
  const [detailedTableExpanded, setDetailedTableExpanded] = useState(false);

  // NEW: separate animation state vs. mount state
  const [showDetail, setShowDetail] = useState(false); // drives CSS transform
  const [mountedDetail, setMountedDetail] = useState(false); // controls conditional render

  // Keep scrollTop at 0 when switching views
  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.scrollTop = 0;
    }
  }, [detailedTableExpanded, parentRef]);

  const searchParams = useSearchParamsToObject();
  const { mapInstance } = useMapInstance();
  const { userLocation } = useUserLocation() as { userLocation: UserLocation };

  const dateDisplay = useMemo(() => {
    const date = new Date(searchParams?.date || new Date());
    return dateFormatter(date);
  }, [searchParams?.date]);

  const { data } = useForecast({
    params: searchParams,
  });

  const toggleDetailedTable = (
    item: AzureFunctionCoordinatesMappedItems | ForecastDay
  ) => {
    middleList();
    if (
      item !== highlightedCard &&
      isAzureFunctionCoordinatesMappedItems(item)
    ) {
      setHighlightedCard(item);
      setTableDisplay("sunchaser");
    } else if (!isAzureFunctionCoordinatesMappedItems(item)) {
      setTableDisplay("forecast");
    }
    setDetailedTableExpanded(true);
  };

  const { mapObject } = useMapObject();

  // useEffect(() => {
  //   if (parentRef.current) {
  //     parentRef.current.scrollTop = 0;
  //   }
  // }, [detailedTableExpanded, parentRef]);

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
    setDetailedTableExpanded(false); // this starts the slide-out
    resetMap();
  };

  // Drive mount/animation timing so collapse animates properly
  useEffect(() => {
    if (detailedTableExpanded) {
      setMountedDetail(true); // mount immediately
      // kick to next frame so the transform transition runs
      requestAnimationFrame(() => setShowDetail(true));
    } else {
      setShowDetail(false); // start slide-out
    }
  }, [detailedTableExpanded]);

  const handleDetailTransitionEnd = () => {
    // after slide-out completes, unmount
    if (!showDetail) setMountedDetail(false);
  };

  const renderSunchaserTable = useCallback(() => {
    if (highlightedCard) {
      const days = splitTimesIntoDays(highlightedCard?.times);
      return (
        <>
          {Object.values(days).map((day: Times[], index) => {
            return (
              <TableItemWrapper expandList={expandList} key={index} day={day} />
            );
          })}
        </>
      );
    } else {
      return <></>;
    }
  }, [highlightedCard?.times, expandList]);

  const renderForecastTable = useCallback(() => {
    if (data) {
      const days = Object.values(data.days);

      return (
        <>
          {days.map((day) => {
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

            return (
              <TableItemWrapper
                expandList={expandList}
                key={day.overview.date}
                day={times}
              />
            );
          })}
        </>
      );
    } else {
      return <></>;
    }
  }, [data, expandList]);

  return (
    <div
      ref={parentRef}
      // style={{
      //   height: "100%",
      //   overflowY: isAtMaxHeight ? "auto" : "hidden",
      //   overflowX: "hidden",
      //   position: "relative",
      //   overscrollBehaviorY: "none",
      //   WebkitOverflowScrolling: "touch",
      // }}
      className="relative"
    >
      <div
        className={`p-2 transition-transform duration-500 ease-in-out will-change-transform ${
          showDetail ? "-translate-x-full" : "translate-x-0"
        }`}
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

      {/* Detail overlay */}
      <div
        className={`absolute inset-0 
          z-10 w-full p-2 pb-14 transition-transform duration-500 
          ease-in-out will-change-transform 
          ${showDetail ? "translate-x-0" : "translate-x-full"}`}
        onTransitionEnd={handleDetailTransitionEnd}
      >
        {mountedDetail && (
          <div className="inline">
            {tableDisplay === "sunchaser" && highlightedCard?.date && (
              <ListWrapper
                location={highlightedCard.primaryName}
                resetDetailedTable={resetDetailedTable}
                renderTable={renderSunchaserTable}
              />
            )}
            {tableDisplay === "forecast" && (
              <ListWrapper
                location={searchParams?.location || "Min lokasjon"}
                resetDetailedTable={resetDetailedTable}
                renderTable={renderForecastTable}
              />
            )}
          </div>
        )}
      </div>
    </div>
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
