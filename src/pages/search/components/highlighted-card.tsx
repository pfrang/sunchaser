import styled from "styled-components";

import { MainCardAnimation } from "../../../ui-kit/main-card/main-card";
import { WeatherIconList } from "../../../ui-kit/weather-svg-ref/weather-icon-list";
import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

interface CardProps extends AzureFunctionCoordinatesMappedItems {}

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  text-align: center;
  position: relative;
  justify-items: center;
  align-items: center;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  padding: 4px;
  border-radius: 8px;
  border: 2px transparent green;
  background-color: white;
  color: black;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -1px 25px, rgba(0, 0, 0, 0.12) 0px 4px 3px,
    rgba(0, 0, 0, 0.1) 0px 1px 3px, rgba(38, 37, 37, 0.09) 0px -3px 3px;
  width: 150px;
  @media screen and (min-width: 800px) {
    width: 400px;
    padding: 10px;
  }
`;

export const HighlightedCard = ({ date, times, location }: CardProps) => {
  const modifiedDate =
    date &&
    `${new Date(date).getDate()}-${new Date(date).toLocaleString("default", {
      month: "short",
    })}`;
  // const modifiedTime = date && `${date.slice(0, -3)}`;

  const { temperature, wind, time, symbol } = times[0];

  const icon =
    WeatherIconList[symbol.charAt(0).toUpperCase() + symbol.slice(1)];

  return (
    <div
      className={`flex w-full h-full justify-center items-center  h-[500px]`}
    >
      <h1 className="text-5xl">{location}</h1>
    </div>
  );
};
