import styled from "styled-components";

import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

interface CardProps extends AzureFunctionCoordinatesMappedItems {}

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  text-align: center;
  color: white;
  position: relative;
  justify-items: center;
  align-items: center;
  height: 100%;
`;

const Wrapper = styled.div`
  background-color: #1c3b59;
  border: 2px solid black;
  padding: 10px;
  border-radius: 8px;
  display: inline-block;
  width: 100%;
  height: 100%;
`;

export const SmallCard = ({ date, location, times, ...props }: CardProps) => {
  const modifiedDate =
    date &&
    `${new Date(date).getDate()}-${new Date(date).toLocaleString("default", {
      month: "short",
    })}`;
  // const modifiedTime = date && `${date.slice(0, -3)}`;

  const { temperature, wind, time } = times[0];

  return (
    <Wrapper>
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
    </Wrapper>
  );
};
