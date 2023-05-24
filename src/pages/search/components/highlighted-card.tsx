import styled from "styled-components";
import { useRef } from "react";

import { Spacer } from "../../../ui-kit/spacer/spacer";
import { WeatherIconList } from "../../../ui-kit/weather-svg-ref/weather-icon-list";
import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { Flex } from "../../../ui-kit/components/flex";
import { Text } from "../../../ui-kit/components/text";

import { TimeSeries } from "./time-series";

interface CardProps extends AzureFunctionCoordinatesMappedItems {}

const ThreeHorizontalGrid = styled.div`
  display: grid;
  grid-template-rows: 2fr auto 3fr;
  width: 100%;
  background-color: white;
  cursor: auto;
`;

const FourHorizontalGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  color: black;
  height: 100%;
  flex-grow: 1;
  /* align-items: center; */
  /* width: 100%; */
  /* background-color: #f2f2f2; */
`;

export const GridItem = styled.div`
  /* display: flex; */
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  height: 100%;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid black;
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
  const scrollRef = useRef(null);

  const handleScroll = (event) => {
    if (event.deltaY !== 0) {
      event.preventDefault();
      scrollRef.current.scrollLeft += event.deltaY;
    }
  };

  const modifiedDate =
    date &&
    `${new Date(date).getDate()}-${new Date(date).toLocaleString("default", {
      month: "short",
    })}`;
  // const modifiedTime = date && `${date.slice(0, -3)}`;

  const gridWidth = {
    mobile: "75px",
    pc: "250px",
  };

  return (
    <ThreeHorizontalGrid>
      <Flex
        justifyContent={"space-around"}
        gap={4}
        alignItems={"center"}
        position={"relative"}
      >
        <Flex position={"absolute"} left={2} top={0}>
          <Text color="black">{`${modifiedDate}`}</Text>
        </Flex>
        <Flex
          width={"100%"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Flex justifyContent={"flex-end"} height={[28, 54]}>
            <Text noWrap color="black">{`sunrise ${times[0].time}`}</Text>
            <img src="/icons/black/svg/partlysunny.svg" />
          </Flex>
          <Flex height={[28, 54]}>
            <Text noWrap color="black">{`sunset ${times[0].time}`}</Text>
            <img src="/icons/black/svg/partlysunny.svg" />
          </Flex>
        </Flex>
      </Flex>
      <Spacer line />
      <div
        ref={scrollRef}
        onWheel={handleScroll}
        className="flex overflow-x-auto"
      >
        <FourHorizontalGrid className="sticky z-10 bg-white -mb-1 left-0 top-0 border-r-2 border-slate-600">
          <GridItem className="relative">
            <Flex
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              width={[gridWidth.mobile, gridWidth.pc]}
            >
              <Text>Time</Text>
            </Flex>
          </GridItem>
          <GridItem className="relative">
            <Flex
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              width={[gridWidth.mobile, gridWidth.pc]}
            >
              <Text>Weather</Text>
            </Flex>
          </GridItem>
          <GridItem className="relative">
            <Flex
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              width={[gridWidth.mobile, gridWidth.pc]}
            >
              <Text>Temperature</Text>
            </Flex>
          </GridItem>
          <Flex
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            width={[gridWidth.mobile, gridWidth.pc]}
          >
            <Text>Wind m/s</Text>
          </Flex>
        </FourHorizontalGrid>
        {times.map((time, idx) => {
          return (
            <FourHorizontalGrid key={idx}>
              <TimeSeries key={`time-${idx}`} {...time} />{" "}
            </FourHorizontalGrid>
          );
        })}
      </div>
    </ThreeHorizontalGrid>
  );
};
