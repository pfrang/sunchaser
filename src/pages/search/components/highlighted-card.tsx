import styled from "styled-components";
import { useRef, useEffect } from "react";

import { Text } from "../../../ui-kit/components/text";
import { Flex } from "../../../ui-kit/components/flex";
import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

import { TimeSeries } from "./time-series";

const TwoHorizontalGrid = styled.div`
  display: grid;
  grid-template-rows: 2fr 3fr;
  width: 100%;
  background-color: white;
  cursor: auto;
`;

const FourHorizontalGrid = styled.div<{ borderRight?: boolean }>`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  color: black;
  height: 100%;
  flex-grow: 1;
  border-right: ${(props) =>
    props.borderRight ? "1px solid rgba(0, 0, 0, 0.2)" : null};
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  /* align-items: center; */
  /* width: 100%; */
  /* background-color: #f2f2f2; */
`;

export const GridItem = styled.div`
  /* display: flex; */
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

interface CardProps extends AzureFunctionCoordinatesMappedItems { }

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

  const gridWidth = {
    mobile: "75px",
    pc: "250px",
  };

  return (
    <TwoHorizontalGrid>
      <Flex
        justifyContent={"space-around"}
        gap={4}
        alignItems={"center"}
        position={"relative"}
      >
        <Flex position={"absolute"} left={2} top={0}>
          <Text>{`${modifiedDate}`}</Text>
        </Flex>
        <Flex
          width={"100%"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Flex justifyContent={"flex-end"} height={[28, 54]}>
            <Text noWrap>{`sunrise ${times[0].time}`}</Text>
            <img src="/icons/black/svg/partlysunny.svg" />
          </Flex>
          <Flex height={[28, 54]}>
            <Text noWrap>{`sunset ${times[0].time}`}</Text>
            <img src="/icons/black/svg/partlysunny.svg" />
          </Flex>
        </Flex>
      </Flex>
      {/* <Spacer line /> */}

      <div className="relative flex overflow-x-auto color-black-600 z-10">
        <svg viewBox="0 0 24 24" id="bouncingArrow">
          <path d="M4 23.245l14.374-11.245L4 0.781l0.619-0.781 15.381 12-15.391 12-0.609-0.755z" />
        </svg>
        <FourHorizontalGrid
          borderRight
          className="sticky bg-white -mb-1 left-0 z-10"
        >
          <GridItem className="relative">
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              height={"100%"}
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
    </TwoHorizontalGrid>
  );
};
