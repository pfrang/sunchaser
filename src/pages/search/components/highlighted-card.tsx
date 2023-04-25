import styled from "styled-components";

import { Spacer } from "../../../ui-kit/spacer/spacer";
import { WeatherIconList } from "../../../ui-kit/weather-svg-ref/weather-icon-list";
import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { Flex } from "../../../ui-kit/components/flex";
import { Text } from "../../../ui-kit/components/text";

import { TimeSeries } from "./time-series";

interface CardProps extends AzureFunctionCoordinatesMappedItems {}

const ThreeHorizontalGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  width: 100%;
  background-color: white;
`;

const FourHorizontalGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  color: black;
  height: 100%;
  /* grid-row-gap: 30px; */
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
      <Flex justifyContent={"space-around"} gap={4} alignItems={"center"}>
        {/* <Flex width={"auto"} height={[28, 54]}>
          <img src="/icons/black/svg/wind_pennant.svg" />
          <Text
            fontSize={["14px", "16px", "18px"]}
            color="black"
          >{`${times[0].wind} m/s`}</Text>
        </Flex> */}
        <Flex
          width={"auto"}
          gap={[2, 12]}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Flex height={[28, 54]}>
            <Text
              fontSize={["14px", "16px", "18px"]}
              color="black"
            >{`sunrise ${times[0].time}`}</Text>
            <img src="/icons/black/svg/partlysunny.svg" />
          </Flex>
          <Flex height={[28, 54]}>
            <Text
              fontSize={["14px", "16px", "18px"]}
              color="black"
            >{`sunset ${times[0].time}`}</Text>
            <img src="/icons/black/svg/partlysunny.svg" />
          </Flex>
        </Flex>
        {/* <Flex width={"auto"} height={[28, 54]}>
          <Text
            fontSize={["14px", "16px", "18px"]}
            color="black"
          >{`${times[0].temperature} ℃`}</Text>
        </Flex> */}
      </Flex>
      <Spacer line />
      <Flex overflowX={"scroll"}>
        <FourHorizontalGrid className="sticky z-10 bg-white -mb-1 left-0 top-0 border-r-2 border-slate-600">
          <GridItem className="relative">
            <Flex
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              width={[gridWidth.mobile, gridWidth.pc]}
            >
              <Text fontSize={["12px", "16px", "18px"]}>Time</Text>
            </Flex>
          </GridItem>
          <GridItem className="relative">
            <Flex
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              width={[gridWidth.mobile, gridWidth.pc]}
            >
              <Text fontSize={["12px", "16px", "18px"]}>Weather</Text>
            </Flex>
          </GridItem>
          <GridItem className="relative">
            <Flex
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              width={[gridWidth.mobile, gridWidth.pc]}
            >
              <Text fontSize={["12px", "16px", "18px"]}>Temperature</Text>
            </Flex>
          </GridItem>
          <Flex
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            width={[gridWidth.mobile, gridWidth.pc]}
          >
            <Text fontSize={["12px", "16px", "18px"]}>Wind m/s</Text>
          </Flex>
        </FourHorizontalGrid>
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
