import styled from "styled-components";

import { Divider } from "../../../ui-kit/components/divider";
import { Flex } from "../../../ui-kit/components/flex";
import { Spacer } from "../../../ui-kit/spacer/spacer";
import { WeatherIconList } from "../../../ui-kit/weather-svg-ref/weather-icon-list";
import { Times } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

interface TimeSeriesProps extends Times {}

const FourHorizontalGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  align-items: center;
  width: 100%;
  background-color: white;
`;

export const TimeSeries = ({
  time,
  weatherRank,
  symbol,
  temperature,
  wind,
}: TimeSeriesProps) => {
  const icon =
    WeatherIconList[symbol.charAt(0).toUpperCase() + symbol.slice(1)];

  const width = 250;
  return (
    <FourHorizontalGrid>
      <div className="text-2xl relative">
        {time}
        <div className="absolute overflow-hidden">
          <Divider width={`${width}px`} />
        </div>
      </div>
      <div className="relative">
        <img src={`/icons/black/svg/${icon}`} />
        <div className="absolute">
          <Divider width={`${width}px`} />
        </div>
      </div>
      <div className="relative">
        <div>{`${temperature} c`}</div>
        <div className="absolute">
          <Divider width={`${width}px`} />
        </div>
      </div>
      <div>{`${wind} ms`}</div>
    </FourHorizontalGrid>
  );
};
