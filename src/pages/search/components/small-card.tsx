import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

import { Card } from "./card";

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
  const props = {
    modifiedDate,
    location,
    temperature,
    wind,
    time,
  };

  return <Card {...props} />;
};
