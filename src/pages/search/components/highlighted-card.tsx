import styled from "styled-components";

import { Spacer } from "../../../ui-kit/spacer/spacer";
import { WeatherIconList } from "../../../ui-kit/weather-svg-ref/weather-icon-list";
import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

import { TimeSeries } from "./time-series";

interface CardProps extends AzureFunctionCoordinatesMappedItems {}

const ThreeHorizontalGrid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  width: 100%;
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
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-5xl">{location}</h1>
      </div>
      <Spacer line />
      <div className="flex justify-between px-4">
        <>
          {times.map((time, idx) => {
            return <TimeSeries key={`time-${idx}`} {...time} />;
          })}
        </>
      </div>
    </ThreeHorizontalGrid>
  );
};
