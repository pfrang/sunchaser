import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

import { Divider } from "../../../ui-kit/components/divider";
import { Flex } from "../../../ui-kit/components/flex";
import { Spacer } from "../../../ui-kit/spacer/spacer";
import { WeatherIconList } from "../../../ui-kit/weather-svg-ref/weather-icon-list";
import { Times } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { Text } from "../../../ui-kit/components/text";

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
          <Text noWrap>{time}</Text>
        </Flex>
      </GridItem>

      <GridItem className="relative">
        <Flex
          width={[gridWidth.mobile, gridWidth.pc]}
          justifyContent={"center"}
          height={[28, 54]}
        >
          <img className="inline object-fit" src={`/icons/black/svg/${icon}`} />
        </Flex>
      </GridItem>
      <GridItem className="relative">
        <Flex
          width={[gridWidth.mobile, gridWidth.pc]}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text noWrap>{`${temperature}`}</Text>
        </Flex>
      </GridItem>

      <Flex
        width={[gridWidth.mobile, gridWidth.pc]}
        height={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text noWrap>{`${wind}`}</Text>
      </Flex>
    </>
  );
};
