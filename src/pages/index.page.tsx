import type { NextPage } from "next";
import Image from "next/image";
import { createContext, useState } from "react";
import styled from "styled-components";

import { Spacer } from "../ui-kit/spacer/spacer";
import { theme } from "../ui-kit/theme/theme";

import SearchCriterias from "./components/search-criterias";
import { WeatherCarousell } from "./components/weather-carousell";

const ThreeGridHorizontalContainer = styled.div`
  display: grid;
  grid-template-rows: 2fr 3fr;
  height: 100%;
  /* border-radius: 100px; */
  position: relative;
  overflow: hidden;
  background-color: ${theme.grey};
  /* z-index: -1; */
`;

const Home: NextPage = () => {
  const [weather, setWeather] = useState("sun");

  const getColor = (weather: string) => {
    switch (weather) {
      case "sun":
        return theme.yellow;
      case "snow":
        return theme.lightGrey;
      default:
        return theme.darkBlue;
    }
  };

  return (
    <ThreeGridHorizontalContainer>
      <div
        className="grid"
        // style={{ backgroundColor: getColor(weather) }}
      >
        {/* <div className="m-auto">
          <h3 className="text-white text-xl">Choose weather</h3>
        </div> */}
        <div className="overflow-hidden bg-inherit h-full">
          <h3 className="absolute left-1/2 z-10">Choose weather</h3>
          <WeatherCarousell setWeather={setWeather} />
        </div>
      </div>
      <div className="h-full p-10">
        <section id="form" className="h-full">
          <div
            className="z-10 border-2 rounded-xl h-full shadow-xl"
            style={{
              backgroundColor: theme.lightGrey,
              borderColor: theme.white,
            }}
          >
            <SearchCriterias />
          </div>
        </section>
      </div>
    </ThreeGridHorizontalContainer>
  );
};

export default Home;
