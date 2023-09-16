import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";

import { theme } from "../ui-kit/theme/theme";
import { Text } from "../ui-kit/components/text";
import { Flex } from "../ui-kit/components/flex";
import { Spacer } from "../ui-kit/spacer/spacer";

import {
  WeatherCarousell,
  WeatherOptions,
} from "./components/weather-carousell";
import UserForm from "./components/search-criterias";

const TwoGridHorizontalContainer = styled.div`
  display: grid;
  grid-template-rows: 2fr 3fr;
  height: 100%;
  width: 100%;
  /* border-radius: 100px; */
  /* overflow: hidden; */
  /* z-index: -1; */
`;

const Home: NextPage = () => {
  const [weather, setWeather] = useState<WeatherOptions>("Sun");

  const getColor = (weather: string) => {
    switch (weather) {
      case "sun":
        return theme.color.yellow;
      case "snow":
        return theme.color.grey[1];
      default:
        return theme.colors.black;
    }
  };

  return (
    <>
      <TwoGridHorizontalContainer>
        <div className="grid">
          <div className="overflow-hidden bg-inherit h-full relative">
            <div className="absolute flex justify-center z-10 w-full">
              <Text variant="subtitle-large">Choose weather</Text>
            </div>

            <WeatherCarousell weather={weather} setWeather={setWeather} />
          </div>
        </div>
        <Flex flexDirection={"column"} paddingX={[4, 6]}>
          <Spacer height={32} />
          <section id="form" className="h-full">
            <div
              className="z-10 border-2 rounded-xl h-full shadow-2xl"
              style={{
                backgroundColor: theme.colors.whiteSmoke,
                borderColor: theme.color.green[1],
              }}
            >
              <UserForm weatherSelected={weather} />
            </div>
          </section>
        </Flex>
      </TwoGridHorizontalContainer>
      {/* <Spacer height={64} /> */}
    </>
  );
};

export const getStaitcPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async () => {
  return {
    props: {
      currentUrl: "/",
    },
  };
};

export default Home;
