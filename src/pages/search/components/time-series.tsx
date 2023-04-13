import styled from "styled-components";

import { Divider } from "../../../ui-kit/components/divider";
import { Flex } from "../../../ui-kit/components/flex";
import { Spacer } from "../../../ui-kit/spacer/spacer";
import { WeatherIconList } from "../../../ui-kit/weather-svg-ref/weather-icon-list";
import { Times } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

import { GridItem } from "./highlighted-card";

interface TimeSeriesProps extends Times {}

export const TimeSeries = ({
  time,
  weatherRank,
  symbol,
  temperature,
  wind,
}: TimeSeriesProps) => {
  const icon =
    WeatherIconList[symbol.charAt(0).toUpperCase() + symbol.slice(1)];

  const width = 0;
  return (
    <>
      <GridItem className="text-2xl relative">
        {time}
        {/* <div className="absolute overflow-hidden">
          <Divider width={`${width}px`} />
        </div> */}
      </GridItem>
      <GridItem className="relative">
        <img className="h-12 w-12" src={`/icons/black/svg/${icon}`} />
        {/* <div className="absolute">
          <Divider width={`${width}px`} />
        </div> */}
      </GridItem>
      <GridItem className="relative">
        <div>{`${temperature} c`}</div>
        {/* <div className="absolute">
          <Divider width={`${width}px`} />
        </div> */}
      </GridItem>
      <GridItem>{`${wind} ms`}</GridItem>
    </>
  );
};
