import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

interface CardProps {
  item: AzureFunctionCoordinatesMappedItems;
  swapItems: any;
}

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  text-align: center;
  position: relative;
  justify-items: center;
  align-items: center;
  height: 100%;
`;

export const SmallCard = ({
  date,
  location,
  times,
}: AzureFunctionCoordinatesMappedItems) => {
  const modifiedDate =
    date &&
    `${new Date(date).getDate()}-${new Date(date).toLocaleString("default", {
      month: "short",
    })}`;
  // const modifiedTime = date && `${date.slice(0, -3)}`;

  const { temperature, wind, time } = times[0];

  return (
    <div className="">
      <div className="text-md flex h-[50px] flex-col w-1/5">
        <img
          className="object-fit h-[50px]"
          src="/icons/black/svg/chanceflurries.svg"
        />
      </div>
      <div className="w-1/5">
        <p>{modifiedDate}</p>
      </div>
      <div className="inline-block text-right w-full ml-auto break-words">
        <div className="">
          <h2 className="text-md">{location}</h2>
        </div>
        <div className="text-xl flex flex-col gap-2">
          <div>{`${temperature}°`}</div>
          <div>{wind}</div>
          <div className="text-xl">{time}</div>
        </div>
      </div>
    </div>
  );
};
