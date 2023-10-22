import React from "react";
import { InferGetServerSidePropsType } from "next";

import { AppConfig } from "../../app-config";
import { useDisplayFooter } from "../../states/footer";

import { Sunchaser } from "./routes/sunchaser/index";
import { Forecast } from "./routes/forecast/index";

export default function Search({
  mapBoxKey,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  return Router({ mapBoxKey });
}

const Router = ({ mapBoxKey }: { mapBoxKey: string }) => {
  const { footerItem, setFooterItem } = useDisplayFooter();

  switch (footerItem) {
    case "forecast":
      return <Forecast />;
    case "location":
      return <div>Coming</div>;
    case "date":
      return <div>Coming</div>;
    default:
      return <Sunchaser mapBoxKey={mapBoxKey} />;
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
