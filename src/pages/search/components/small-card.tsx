import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

import { Card } from "./card";

interface CardProps {
  item: AzureFunctionCoordinatesMappedItems;
  swapItems: any;
}

export const SmallCard = ({ highlightedCard, item }) => {
  const { date, location, times } = item;

  const highlighted = item === highlightedCard;

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

  return (
    <div
      className={`p-2 grid grid-cols-3 h-full bg-red rounded-md border-2 ${
        highlighted &&
        "transition delay-150 duration-200 ease-in-out bg-slate-700 text-white"
      }`}
    >
      <div className="text-md flex flex-col flex h-[50px] ">
        <img
          className="object-fit h-[50px]"
          src="/icons/black/svg/chanceflurries.svg"
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-1/5">
          <p>{modifiedDate}</p>
        </div>
        <div>Google Maps?</div>
      </div>

      <div className="flex flex-col justify-between text-right h-full w-full break-words">
        <h2 className="text-md">{location}</h2>

        <div>{`${temperature}°`}</div>
        <div>{wind}</div>
        <div className="text-md tablet:text-xl">{time}</div>
      </div>
    </div>
  );
};
