import type { InferGetStaticPropsType, NextPage } from "next";
import { useState } from "react";

import { theme } from "../ui-kit/theme";
import { Text } from "../ui-kit/text";
import { Flex } from "../ui-kit/flex";
import { Spacer } from "../ui-kit/spacer/spacer";
import { AppConfig } from "../app-config";

import {
  WeatherCarousell,
  WeatherOptions,
} from "./components/weather-carousell";
import UserForm from "./components/search-criterias";

const Home: NextPage = ({
  mapBoxKey,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [weather, setWeather] = useState<WeatherOptions>("Sun");

  return (
    <>
      <Flex
        height={["250px"]}
        overflow={"hidden"}
        position={"relative"}
        flexDirection={"column"}
      >
        <div className="bg-inherit h-full relative">
          <div className="absolute flex justify-center z-10 w-full">
            <Text variant="subtitle-large">Choose weather</Text>
          </div>

          <WeatherCarousell weather={weather} setWeather={setWeather} />
        </div>
      </Flex>
      <Spacer height={[16, 32]} />
      <Flex flexGrow={1} flexDirection={"column"} paddingX={[4, 6]}>
        <section id="form" className="grow">
          <div
            className="border-2 rounded-xl h-full shadow-2xl"
            style={{
              backgroundColor: theme.colors.whiteSmoke,
              borderColor: theme.color.green[1],
            }}
          >
            <UserForm weatherSelected={weather} mapBoxKey={mapBoxKey} />
          </div>
        </section>
      </Flex>
    </>
  );
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
