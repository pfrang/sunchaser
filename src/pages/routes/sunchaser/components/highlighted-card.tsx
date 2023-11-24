import styled from "styled-components";
import { useRef, useEffect, useState, useMemo, MutableRefObject } from "react";
import Image from "next/image";

import { Text } from "../../../../ui-kit/text";
import { Flex } from "../../../../ui-kit/flex";
import {
  Times,
  UserLocation,
} from "../../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { LinkContent } from "../../../../ui-kit/link-content";
import {
  getSortedTemperatureFromArrOfTimes,
  plus2HoursOnTime,
} from "../../../utils/sorting-and-filtering-functions";
import { Temperature } from "../../../utils/temperature";

import { TimeSeries } from "./time-series";

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

interface CardProps {
  date: Date;
  userLocation: UserLocation;
  longitude: number;
  latitude: number;
  sunriseTime: string;
  sunsetTime: string;
  times: Times[] | [];
}

export const HighlightedCard = ({
  date,
  userLocation,
  longitude,
  latitude,
  sunriseTime,
  sunsetTime,
  times,
}: CardProps) => {
  const svgContainerRef = useRef<HTMLDivElement | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const modifiedDate = useMemo(() => {
    return `${new Date(date).getDate()}-${new Date(date).toLocaleString(
      "default",
      {
        month: "short",
      },
    )}`;
  }, []);

  const gridWidth = {
    mobile: "75px",
    pc: "250px",
  };

  useEffect(() => {
    if (!svgContainerRef.current) return;
    const svgContainer = svgContainerRef.current;
    const hasScroll = svgContainer.scrollWidth > svgContainer.clientWidth;

    function checkIfScroll() {
      if (svgContainer.scrollLeft !== 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    svgContainer.addEventListener("scroll", checkIfScroll);

    return () => {
      if (!hasScroll) return setIsScrolling(true);
      svgContainer.removeEventListener("scroll", checkIfScroll);
    };
  }, []);

  const maxTemperatureToday = getSortedTemperatureFromArrOfTimes(times, "desc");
  const minTemperatureToday = getSortedTemperatureFromArrOfTimes(times, "asc");

  return (
    <Flex flexDirection={"column"} backgroundColor={"white"} height={"100%"}>
      <Flex
        alignItems={"center"}
        position={"relative"}
        flexDirection={"column"}
        paddingX={4}
        flex={"1"}
      >
        <Flex width={"100%"} justifyContent={"space-between"}>
          <Text>{`${modifiedDate}`}</Text>
          <LinkContent>
            <a
              target="_blank"
              href={`https://www.google.com/maps/dir/${userLocation.latitude},${userLocation.longitude}/${latitude},${longitude}`}
            >
              <Text color="inherit">{`Google Maps`}</Text>
            </a>
          </LinkContent>
        </Flex>
        <Flex
          width={"100%"}
          height={"100%"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Flex justifyContent={"flex-end"} height={[28, 54]}>
            <Text noWrap>{`sunrise ${plus2HoursOnTime(sunriseTime)}`}</Text>
            <Image
              alt="partlySunny"
              src="/icons/black/svg/partlysunny.svg"
              width={64}
              height={64}
            />
          </Flex>
          <Flex height={[28, 54]}>
            <Text noWrap>{`sunset ${plus2HoursOnTime(sunsetTime)}`}</Text>
            <Image
              alt="partlySunny"
              src="/icons/black/svg/partlysunny.svg"
              width={64}
              height={64}
            />
          </Flex>
        </Flex>
        <Flex width={"100%"} justifyContent={"space-between"}>
          {maxTemperatureToday?.temperature && (
            <Text variant="body-small">{`Max ${
              new Temperature(maxTemperatureToday?.temperature).toString() || ""
            } at ${plus2HoursOnTime(maxTemperatureToday?.time || "")}`}</Text>
          )}
          {minTemperatureToday?.temperature && (
            <Text variant="body-small">{`Min ${new Temperature(
              minTemperatureToday?.temperature,
            ).toString()} at ${plus2HoursOnTime(
              minTemperatureToday?.time,
            )}`}</Text>
          )}
        </Flex>
      </Flex>
      {times.length > 0 && (
        <div
          ref={svgContainerRef}
          className="relative flex overflow-x-auto overflow-y-hidden color-black-600 z-10 "
        >
          <span
            id="bouncingArrow"
            style={{
              animationName: "bounce",
            }}
            className={`absolute m-r-12 right-4 bottom-1/2 z-10 ${
              isScrolling && "hidden"
            }`}
          >
            <svg viewBox="0 0 24 24" height={"20px"} width={"24px"}>
              <path d="M4 23.245l14.374-11.245L4 0.781l0.619-0.781 15.381 12-15.391 12-0.609-0.755z" />
            </svg>
          </span>
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
              flex={"1 1 auto"}
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
      )}
    </Flex>
  );
};
