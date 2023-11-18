import { Flex } from "../../../../ui-kit/flex";
import { Text } from "../../../../ui-kit/text";
import { WeatherIconList } from "../../../../ui-kit/weather-svg-ref/weather-icon-list";
import { Times } from "../../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { Temperature } from "../../../utils/temperature";

export const Carousell2Details = ({ times }: { times: Times[] }) => {
  const icon =
    WeatherIconList[
      times[0].symbol?.charAt(0).toUpperCase() + times[0].symbol?.slice(1)
    ];

  return (
    <Flex gap={0.5}>
      {times.slice(0, 4).map((time) => {
        return (
          <Flex
            padding={[1, 2]}
            borderRadius={18}
            borderWidth={2}
            borderColor={"#242A3F"}
            boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Text color="white">{time.time}</Text>
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
              {new Temperature(time.temperature).toString()}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
};
