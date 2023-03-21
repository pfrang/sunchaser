import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";

import { theme } from "../ui-kit/theme/theme";

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
        return theme.yellow;
      case "snow":
        return theme.lightGrey;
      default:
        return theme.darkBlue;
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
            <h3>Choose weather</h3>
          </div>
          <WeatherCarousell setWeather={setWeather} />
        </div>
      </div>
      <div className="p-10">
        <section id="form" className="h-full">
          <div
            className="z-10 border-2 rounded-xl h-full shadow-2xl"
            style={{
              backgroundColor: theme.lightGrey,
              borderColor: theme.white,
            }}
          >
            <SearchCriterias />
          </div>
        </section>
      </div>
    </TwoGridHorizontalContainer>
  );
};

export default Home;
