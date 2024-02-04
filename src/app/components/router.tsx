"use client";

import { useEffect } from "react";
import {
  useDisplayFooter,
  useDisplayFooterSubItems,
  useDisplayIsFooterExpanded,
} from "states/footer";
import { Flex } from "ui-kit/flex";
import { useRouter } from "next/navigation";

import { useCoordinates } from "../hooks/use-coordinates";
import { useUserLocation } from "../hooks/use-user-location";
import { sanitizeNextParams } from "../utils/sanitize-next-query";
import { useSearchParamsToObject } from "../hooks/use-search-params";
import { useDisplayFooter2 } from "../../states/footer2";

import { ChooseTravelDistance } from "./_shared/choose-travel-distance";
import { Forecast } from "./forecast";
import { Sunchaser } from "./sunchaser";
import { CalendarWrapper } from "./sunchaser/components/calendar-wrapper";
import { LocationModal } from "./_shared/location-modal";
import { Map } from "./sunchaser/components/map";
import { ForecastMap } from "./forecast/components/forecast-map";

const RouterWrapper = ({ mapBoxKey }: { mapBoxKey: string }) => {
  return (
    <>
      <div className="h-full">
        <Router mapBoxKey={mapBoxKey} />
      </div>
    </>
  );
};

const Router = ({ mapBoxKey }: { mapBoxKey: string }) => {
  const { footerItem } = useDisplayFooter2();

  const searchParams = useSearchParamsToObject();
  const router = useRouter();
  const { userLocation } = useUserLocation();

  useCoordinates({
    method: "POST",
    params: searchParams,
    data: searchParams,
  });

  useEffect(() => {
    if (searchParams?.lat || !userLocation) return;

    const params = {
      distance: searchParams?.distance ?? 50,
      lat: searchParams?.lat ?? userLocation.latitude,
      lon: searchParams?.lon ?? userLocation.longitude,
      date: searchParams?.date ?? new Date().toISOString().split("T")[0],
      location: searchParams?.location ?? "",
    };

    const urlParams = sanitizeNextParams(params);

    router.push(`/?${urlParams}`);
  }, [userLocation]);

  if (!userLocation) return <LocationModal />;

  switch (footerItem) {
    case "forecast":
      return <ForecastMap mapBoxKey={mapBoxKey} />;
    default:
      return <Sunchaser mapBoxKey={mapBoxKey} />;
  }
};

export default RouterWrapper;
