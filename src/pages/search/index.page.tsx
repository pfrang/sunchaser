import React, { useRef, useState } from "react";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

import { AppConfig } from "../../app-config";
import {
  useDisplayFooter,
  useDisplayFooterSubItems,
} from "../../states/footer";
import { useCoordinates } from "../hooks/use-coordinates";
import { ChooseTravelDistance } from "../components/choose-travel-distance";
import { Calendar } from "../components/calendar";

import { Sunchaser } from "./routes/sunchaser/index";
import { Forecast } from "./routes/forecast/index";

export default function Search({
  mapBoxKey,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  return Router({ mapBoxKey });
}

const Router = ({ mapBoxKey }: { mapBoxKey: string }) => {
  const { footerItem, setFooterItem } = useDisplayFooter();
  const { footerSubItem, setFooterSubItem } = useDisplayFooterSubItems();
  const travelDistanceRef = useRef<HTMLInputElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const router = useRouter();

  const { data, isLoading, error } = useCoordinates(
    {
      method: "POST",
      params: router.query,
      data: router.query,
    },
    router.isReady
  );

  switch (footerItem) {
    case "forecast":
      switch (footerSubItem) {
        case "map":
          return <>coming</>;
        case "location":
          return <>coming</>;
        case "profile":
          return <>coming</>;
        default:
          return <Forecast />;
      }
    default:
      switch (footerSubItem) {
        case "date":
          return (
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          );
        case "location":
          return (
            <ChooseTravelDistance
              travelDistanceRef={travelDistanceRef}
              mapBoxKey={mapBoxKey}
            />
          );
        case "profile":
          return <>coming</>;
        default:
          return <Sunchaser mapBoxKey={mapBoxKey} />;
      }
  }
};

export const getStaticProps = async () => {
  const mapBoxKey = new AppConfig().mapBox.key;

  return {
    props: {
      mapBoxKey,
    },
  };
};
