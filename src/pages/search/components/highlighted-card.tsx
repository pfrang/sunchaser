import styled from "styled-components";

import { Spacer } from "../../../ui-kit/spacer/spacer";
import { WeatherIconList } from "../../../ui-kit/weather-svg-ref/weather-icon-list";
import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { Flex } from "../../../ui-kit/components/flex";

import { TimeSeries } from "./time-series";

interface CardProps extends AzureFunctionCoordinatesMappedItems {}

const ThreeHorizontalGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  background-color: white;
`;

const FourHorizontalGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  width: 500px;
  /* grid-row-gap: 30px; */
  /* align-items: center; */
  /* width: 100%; */
  /* background-color: #f2f2f2; */
`;

export const GridItem = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid black;
  }
`;

export const HighlightedCard = ({
  rank,
  date,
  latitude,
  longitude,
  location,
  times,
}: CardProps) => {
  const modifiedDate =
    date &&
    `${new Date(date).getDate()}-${new Date(date).toLocaleString("default", {
      month: "short",
    })}`;
  // const modifiedTime = date && `${date.slice(0, -3)}`;

  return (
    <ThreeHorizontalGrid>
      <div>
        <a
          className="text-blue-600 underline"
          href="https://www.google.com"
          target="_blank"
        >
          Google maps?
        </a>
        <Spacer line />
      </div>
      <Flex justifyContent={"space-around"} gap={4} alignItems={"center"}>
        <div>
          <img src="/icons/black/svg/wind_pennant.svg" />
          <p>{`${times[0].wind} m/s`}</p>
        </div>
        <div className="flex flex-col justify-center text-black">
          {location}
        </div>
        <div>
          <p>{`${times[0].temperature} ℃`}</p>
        </div>
      </Flex>
      <Spacer line />
      <Flex overflowX={"scroll"}>
        {times.map((time, idx) => {
          return (
            <FourHorizontalGrid key={idx}>
              <TimeSeries key={`time-${idx}`} {...time} />{" "}
            </FourHorizontalGrid>
          );
        })}
      </Flex>
    </ThreeHorizontalGrid>
  );
};
