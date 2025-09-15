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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "ui-kit/carousel/Carousel";
import { Card, CardContent } from "@mui/material";

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
    setHighlightedCard(undefined);

    requestAnimationFrame(() => resetMap());
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

  const { api } = useCarousel();

  const current = api?.selectedScrollSnap(); // 👈 track active index
  const activeTimesComponent = useMemo(() => {
    if (highlightedCard) {
      const days = splitTimesIntoDays(highlightedCard.times);
      return (
        <>
          {Object.values(days).map((day: Times[], index) => {
            return (
              <TableItemWrapper expandList={expandList} key={index} day={day} />
            );
          })}
        </>
      );
    }
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
    }
    return <></>;
  }, [highlightedCard, current]);

  useEffect(() => {
    if (current === 0) {
      resetDetailedTable();
    }
  }, [current]);

  return (
    <>
      <CarouselContent>
        <CarouselItem>
          <div className="flex gap-4">
            <ForecastNew toggleDetailedTable={toggleDetailedTable} />
          </div>
          <span className="block h-4 border-b-4 border-greens-600"></span>
          <div className="py-4">
            <SunchaserResultList toggleDetailedTable={toggleDetailedTable} />
          </div>
        </CarouselItem>
        <CarouselItem>
          <ListWrapper
            location={
              highlightedCard?.primaryName ||
              searchParams?.location ||
              "Min lokasjon"
            }
            resetDetailedTable={resetDetailedTable}
            renderTable={activeTimesComponent}
          />
        </CarouselItem>
      </CarouselContent>
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
