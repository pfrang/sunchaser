import { AppConfig } from "app-config";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDisplayFooter, useDisplayFooterSubItems } from "states/footer";
import { Flex } from "ui-kit/flex";

import { Forecast } from "./routes/forecast";
import { Sunchaser } from "./routes/sunchaser";
import { useUserLocation } from "./hooks/use-user-location";
import { useCoordinates } from "./hooks/use-coordinates";
import { CalendarWrapper } from "./routes/sunchaser/components/calendar-wrapper";
import { ChooseTravelDistance } from "./routes/_shared/components/choose-travel-distance";

const Home = ({
  mapBoxKey,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return Router({ mapBoxKey });
};

const Router = ({ mapBoxKey }: { mapBoxKey: string }) => {
  const { footerItem, setFooterItem } = useDisplayFooter();
  const { footerSubItem, setFooterSubItem } = useDisplayFooterSubItems();

  const router = useRouter();
  const { userLocation } = useUserLocation();

  const { data, isLoading, error } = useCoordinates(
    {
      method: "POST",
      params: router.query,
      data: router.query,
    },
    router.isReady && Boolean(router.query.lat)
  );

  useEffect(() => {
    if (!userLocation) return;
    router.push({
      pathname: "/",
      query: {
        distance: 50,
        lat: userLocation.latitude,
        lon: userLocation.longitude,
        date: new Date().toISOString().split("T")[0],
      },
    });
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

export const getStaticProps = async () => {
  const mapBoxKey = new AppConfig().mapBox.key;

  return {
    props: {
      mapBoxKey,
    },
  };
};

export default Home;
