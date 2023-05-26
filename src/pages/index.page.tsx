import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { Flex } from "../ui-kit/components/flex";
import { theme } from "../ui-kit/theme/theme";
import { Text } from "../ui-kit/components/text";

import SearchCriterias from "./components/search-criterias";
import { WeatherCarousell } from "./components/weather-carousell";

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
  const [weather, setWeather] = useState("sun");

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
    <TwoGridHorizontalContainer>
      <div
        className="grid"
        // style={{ backgroundColor: getColor(weather) }}
      >
        {/* <div className="m-auto">
          <h3 className="text-white text-xl">Choose weather</h3>
        </div> */}
        <div className="overflow-hidden bg-inherit h-full relative">
          <div className="absolute flex justify-center z-10 w-full">
            <Text variant="subtitle-large" color="black">
              Choose weather
            </Text>
          </div>
          <WeatherCarousell setWeather={setWeather} />
        </div>
      </div>
      <div className="px-10 pt-10">
        <section id="form" className="h-full">
          <div
            className="z-10 border-2 rounded-xl h-full shadow-2xl"
            style={{
              backgroundColor: theme.colors.whiteSmoke,
              borderColor: theme.color.white,
            }}
          >
            <SearchCriterias />
          </div>
        </section>
      </div>
    </TwoGridHorizontalContainer>
  );
};

export async function getServerSideProps({ req, query, resolvedUrl }) {
  return {
    props: {
      currentUrl: resolvedUrl,
    }, // will be passed to the page component as props
  };
}

export default Home;
