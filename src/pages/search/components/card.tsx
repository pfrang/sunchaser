import styled from "styled-components";

import { AzureFunctionCoordinatesMappedItem } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

interface CardProps extends AzureFunctionCoordinatesMappedItem {}

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  text-align: center;
`;

export const Card = ({ date, location, times }: CardProps) => {
  const modifiedDate =
    date &&
    `${new Date(date).getDate()}-${new Date(date).toLocaleString("default", {
      month: "short",
    })}`;
  // const modifiedTime = date && `${date.slice(0, -3)}`;

  const { temperature, wind } = times[0];

  return (
    <div className="border-2 p-2">
      <Grid3>
        <div className="text-md flex flex-col w-10">
          <img src="/icons/black/svg/chanceflurries.svg" />
          <p>{modifiedDate}</p>
        </div>
        <div className="text-xl flex flex-col justify-between">
          <p>{location}</p>
          <p>Google maps</p>
        </div>
        <div className="text-xl flex flex-col gap-2">
          <div>{`${temperature}°`}</div>
          <div>{wind}</div>
          {/* <div className="text-xl">{modifiedDate}</div> */}
        </div>
      </Grid3>
    </div>
  );
};
