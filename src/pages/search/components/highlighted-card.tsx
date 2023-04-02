import styled from "styled-components";

import { Spacer } from "../../../ui-kit/spacer/spacer";
import { WeatherIconList } from "../../../ui-kit/weather-svg-ref/weather-icon-list";
import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { Flex } from "../../../ui-kit/components/flex";

import { TimeSeries } from "./time-series";

interface CardProps extends AzureFunctionCoordinatesMappedItems {}

const ThreeHorizontalGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 2fr;
  width: 100%;
  background-color: white;
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
      <Flex justifyContent={"center"} alignItems={"center"}>
        <div className="h-24 w-24">
          <img src="/icons/black/svg/wind_pennant.svg" />
        </div>
        <div className="flex flex-col justify-center text-black">
          {location}
        </div>
        <div></div>
      </Flex>
      <Spacer line />
      <Flex overflowX={"scroll"} gap={150}>
        <>
          {times.map((time, idx) => {
            return <TimeSeries key={`time-${idx}`} {...time} />;
          })}
        </>
      </Flex>
    </ThreeHorizontalGrid>
  );
};
