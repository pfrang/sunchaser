"use client";
import { getInterval, getWeatherIconFromTimes } from "app/utils/times-helper";
import { Times } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

import { Flex } from "../../../../ui-kit/flex";
import { Text } from "../../../../ui-kit/text";
import { Temperature } from "../../../utils/temperature";

export const CarousellDetails = ({ times }: { times: Times[] }) => {
  const timeIntervals = {
    "00-06": getInterval(times, 0, 6),
    "06-12": getInterval(times, 6, 12),
    "12-18": getInterval(times, 12, 18),
    "18-23": getInterval(times, 18, 23),
  };

  return (
    <Flex gap={0.5}>
      {Object.keys(timeIntervals).map((time) => {
        const times = timeIntervals[time] as Times[];
        if (times.length === 0) return null;

        const icon = getWeatherIconFromTimes(timeIntervals[time]);
        return (
          <Flex
            padding={[1, 2]}
            borderRadius={18}
            borderWidth={2}
            borderColor={"#242A3F"}
            boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
            flexDirection={"column"}
            alignItems={"center"}
            key={time}
          >
            <Text color="white">{time}</Text>
            <Flex
              // flexDirection={["column", "row"]}
              alignItems={"center"}
              justifyContent={"center"}
              height={[24, 48]}
              width={[24, 48]}
            >
              <img
                src={`/icons/white/svg/${icon}`}
                className="object-contain"
                alt={icon}
              />
            </Flex>
            <Text color="white">
              {/* // TODO shouldnt be 0 indexed */}
              {new Temperature(timeIntervals[time][0].temperature).toString()}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
};
