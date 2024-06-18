import { Collapse, useMediaQuery } from "@mui/material";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  AzureFunctionCoordinatesMappedItems,
  Times,
} from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { getInterval, getWeatherIconFromTimes } from "app/utils/times-helper";
import React from "react";

import { Carousell } from "./carousell";

export const ResultListItem = ({
  item,
  onClickCard,
  shouldExpand,
}: {
  item: AzureFunctionCoordinatesMappedItems;
  onClickCard: (item: AzureFunctionCoordinatesMappedItems) => void;
  shouldExpand: boolean;
}) => {
  return (
    <div id={item.index.toString()} className="relative flex w-full flex-col">
      <button
        onClick={() => onClickCard(item)}
        className={`w-full cursor-pointer rounded-md bg-greens-300 py-1 shadow-custom-minor md:py-2`}
      >
        <div className="flex items-center justify-between px-4">
          <div className="flex gap-4 font-bold ">
            <p className="text-variant-roboto flex items-center justify-center rounded-full border-2 border-black px-2">{`${
              item.index + 1
            }`}</p>

            <p className="text-variant-roboto">{item.primaryName}</p>
          </div>

          <div className="flex justify-end gap-4">
            <div className="flex">{Icon(item.times)}</div>
            {shouldExpand ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowRightIcon />
            )}
          </div>
        </div>
      </button>

      <Collapse in={shouldExpand}>
        <Carousell item={item} />
      </Collapse>
    </div>
  );
};

const Icon = (times: Times[]) => {
  const mediaQuery = window && useMediaQuery("(max-width: 800px)");

  const nightIcon = getInterval(times, 0, 5);
  const morningIcon = getInterval(times, 6, 11);
  const afternoonIcon = getInterval(times, 12, 17);
  const eveningIcon = getInterval(times, 18, 23);

  const icons = mediaQuery
    ? {
        morgen: getWeatherIconFromTimes(getInterval(times, 0, 12)),
        kveld: getWeatherIconFromTimes(getInterval(times, 13, 23)),
      }
    : {
        natt: getWeatherIconFromTimes(nightIcon),
        morgen: getWeatherIconFromTimes(morningIcon),
        ettermiddag: getWeatherIconFromTimes(afternoonIcon),
        kveld: getWeatherIconFromTimes(eveningIcon),
      };

  // const icons = {
  //   natt: getIcon(nightIcon),
  //   morgen: getIcon(morningIcon),
  //   ettermiddag: getIcon(afternoonIcon),
  //   kveld: getIcon(eveningIcon),
  // };

  return (
    <>
      {Object.keys(icons).map((key) => {
        if (icons[key]) {
          return (
            <React.Fragment key={key}>
              <div className="flex flex-col items-center justify-between">
                <div className="flex items-center justify-center">
                  <Image
                    height={28}
                    width={28}
                    src={`/icons/black/svg/${icons[key]}`}
                    alt={icons[key]}
                  />
                </div>
              </div>
            </React.Fragment>
          );
        }
      })}
    </>
  );
};
