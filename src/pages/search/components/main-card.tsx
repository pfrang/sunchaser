import styled from "styled-components";

import { MainCardAnimation } from "../../../ui-kit/main-card/main-card";
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
  padding: 10px;
  border-radius: 8px;
  border: 2px transparent green;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

export const MainCard = ({ date, location, times, ...props }: CardProps) => {
  const modifiedDate =
    date &&
    `${new Date(date).getDate()}-${new Date(date).toLocaleString("default", {
      month: "short",
    })}`;
  // const modifiedTime = date && `${date.slice(0, -3)}`;

  const { temperature, wind, time } = times[0];

  return (
    <Wrapper>
      <div className="relative w-4/5 tablet: w-2/3 h-[150px] tablet:h-[150px] phone:h-[150px]">
        <Grid3>
          <div className="text-md flex flex-col">
            <img src="/icons/black/svg/chanceflurries.svg" />
            <p>{modifiedDate}</p>
          </div>
          <div className="flex flex-col justify-between">
            <div className="m-auto">
              <h2 className="text-xl">{location}</h2>
            </div>
            <p className="m-t-auto">Google maps</p>
          </div>
          <div className="text-xl flex flex-col gap-2">
            <div>{`${temperature}°`}</div>
            <div>{wind}</div>
            <div className="text-xl">{time}</div>
          </div>
        </Grid3>
      </div>
    </Wrapper>
  );
};
