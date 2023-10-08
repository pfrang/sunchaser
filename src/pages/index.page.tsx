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
        height={["150px", "250px"]}
        overflow={"hidden"}
        flexDirection={"column"}
      >
        <div className="absolute flex justify-center z-10 w-full">
          <Text variant="subtitle-large">Choose weather</Text>
        </div>

        <WeatherCarousell weather={weather} setWeather={setWeather} />
      </Flex>
      <Spacer height={[16, 32]} />
      <Flex flexDirection={"column"} paddingX={[4, 6]}>
        <section id="form">
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
