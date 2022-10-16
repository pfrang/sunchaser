import styled from "styled-components";

import { CoordinatesMappedData } from "../../api/azure-function/coordinates/mapper/coordinates-mapper";

interface CardProps extends CoordinatesMappedData {}

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  text-align: center;
`;

export const Card = ({
  latitude,
  longitude,
  date,
  symbol,
  temperature,
  time,
  wind,
}: CardProps) => {
  const modifiedDate =
    date &&
    `${new Date(date).getDate()}-${new Date(date).toLocaleString("default", {
      month: "short",
    })}`;
  const modifiedTime = time && `${time.slice(0, -3)}`;
  return (
    <div className="border-2 p-2">
      <Grid3>
        <div className="text-md flex flex-col w-10">
          <img src="/icons/black/svg/chanceflurries.svg" />
          <p>{modifiedDate}</p>
        </div>
        <div className="text-xl flex flex-col justify-between">
          <p>New Mexico</p>
          <p>Google maps</p>
        </div>
        <div className="text-xl flex flex-col gap-2">
          <div>{`${temperature}°`}</div>
          <div>{wind}</div>
          <div className="text-xl">{modifiedTime}</div>
        </div>
      </Grid3>
    </div>
  );
};
