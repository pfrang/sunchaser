"use client";

import { useEffect } from "react";
import { useDisplayFooter, useDisplayFooterSubItems } from "states/footer";
import { Flex } from "ui-kit/flex";
import { useRouter } from "next/navigation";

import { useCoordinates } from "../hooks/use-coordinates";
import { useUserLocation } from "../hooks/use-user-location";
import { sanitizeNextParams } from "../utils/sanitize-next-query";
import { useSearchParamsToObject } from "../hooks/use-search-params";

import { ChooseTravelDistance } from "./_shared/choose-travel-distance";
import { Forecast } from "./forecast";
import { Sunchaser } from "./sunchaser";
import { CalendarWrapper } from "./sunchaser/components/calendar-wrapper";

const Router = ({ mapBoxKey }: { mapBoxKey: string }) => {
  useEffect(() => {
    // Set a CSS variable to the height of the viewport
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`,
    );
  }, []);
  const { footerItem } = useDisplayFooter();
  const { footerSubItem } = useDisplayFooterSubItems();

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

  switch (footerItem) {
    case "forecast":
      switch (footerSubItem) {
        case "map":
          return <Flex height={"100%"}>coming</Flex>;
        case "date":
          return <Flex height={"100%"}>coming</Flex>;
        case "profile":
          return <Flex height={"100%"}>coming</Flex>;
        default:
          return <Forecast />;
      }
    default:
      switch (footerSubItem) {
        case "date":
          return <CalendarWrapper />;
        case "location":
          return <ChooseTravelDistance mapBoxKey={mapBoxKey} />;
        case "profile":
          return <Flex height={"100%"}>coming</Flex>;
        default:
          return <Sunchaser mapBoxKey={mapBoxKey} />;
      }
  }
};

export default Router;
