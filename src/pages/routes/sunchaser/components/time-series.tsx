import { Flex } from "../../../../ui-kit/flex";
import { WeatherIconList } from "../../../../ui-kit/weather-svg-ref/weather-icon-list";
import { Times } from "../../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { Text } from "../../../../ui-kit/text";
import { Temperature } from "../../../utils/temperature";
import { plus2HoursOnTime } from "../../../utils/sorting-and-filtering-functions";

import { GridItem } from "./highlighted-card";

interface TimeSeriesProps extends Times {}

export const TimeSeries = ({
  time,
  rank,
  symbol,
  temperature,
  wind,
}: TimeSeriesProps) => {
  const icon =
    WeatherIconList[symbol.charAt(0).toUpperCase() + symbol.slice(1)];

  const gridWidth = {
    mobile: "75px",
    pc: "250px",
  };

  //TODO give a fixed width to GridItems

  return (
    <>
      <GridItem className="relative">
        <Flex
          width={[gridWidth.mobile, gridWidth.pc]}
          height={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text noWrap>{plus2HoursOnTime(time)}</Text>
        </Flex>
      </GridItem>

      <GridItem className="relative">
        <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
          <Flex width={["28px", "40px"]}>
            <img className="object-fit" src={`/icons/black/svg/${icon}`} />
          </Flex>
        </Flex>
      </GridItem>
      <GridItem className="relative">
        <Flex
          // width={[gridWidth.mobile, gridWidth.pc]}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text noWrap>{`${new Temperature(temperature).toString()}`}</Text>
        </Flex>
      </GridItem>

      <Flex
        // width={[gridWidth.mobile, gridWidth.pc]}
        height={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        flex={"1 1 auto"}
      >
        <Text noWrap>{`${wind}`}</Text>
      </Flex>
    </>
  );
};