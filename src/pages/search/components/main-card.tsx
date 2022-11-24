import styled from "styled-components";

import { MainCardAnimation } from "../../../ui-kit/main-card/main-card";
import { WeatherIconList } from "../../../ui-kit/weather-svg-ref/weather-icon-list";
import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

interface CardProps extends AzureFunctionCoordinatesMappedItems {}

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  text-align: center;
  position: relative;
  justify-items: center;
  align-items: center;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  padding: 4px;
  border-radius: 8px;
  border: 2px transparent green;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -1px 25px, rgba(0, 0, 0, 0.12) 0px 4px 3px,
    rgba(0, 0, 0, 0.1) 0px 1px 3px, rgba(38, 37, 37, 0.09) 0px -3px 3px;
  width: 150px;
  @media screen and (min-width: 800px) {
    width: 400px;
    padding: 10px;
  }
`;

export const MainCard = ({ date, location, times, ...props }: CardProps) => {
  const modifiedDate =
    date &&
    `${new Date(date).getDate()}-${new Date(date).toLocaleString("default", {
      month: "short",
    })}`;
  // const modifiedTime = date && `${date.slice(0, -3)}`;

  const { temperature, wind, time, symbol } = times[0];

  const icon =
    WeatherIconList[symbol.charAt(0).toUpperCase() + symbol.slice(1)];

  return (
    <Wrapper>
      <div className="relative text-sm h-[150px] tablet:h-[150px] phone:h-[150px]">
        <Grid3>
          <div className="text-md tablet:text-xl flex flex-col">
            {/* <img src="/icons/black/svg/chanceflurries.svg" /> */}
            <img src={`/icons/black/svg/${icon}`} />
            <p>{modifiedDate}</p>
          </div>
          <div className="flex flex-col justify-between">
            <div className="m-auto">
              <h2 className="text-md tablet:text-xl">{location}</h2>
            </div>
            <p className="m-t-auto">Google maps</p>
          </div>
          <div className="text-md tablet:text-xl flex flex-col gap-2">
            <div>{`${temperature}°`}</div>
            <div>{wind}</div>
            <div className="text-md tablet:text-xl">{time}</div>
          </div>
        </Grid3>
      </div>
    </Wrapper>
  );
};
