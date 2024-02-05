"use client";

import {
  AzureFunctionCoordinatesMappedItems,
  Times,
} from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import React from "react";

import { CarousellDetails } from "./carousell-details";

export const Carousell = ({
  item,
}: {
  item: AzureFunctionCoordinatesMappedItems;
}) => {
  const days = item.times.reduce((acc, item) => {
    const date = item.date.toString().split("T")[0]; // Extract the date part
    if (!acc[date]) {
      acc[date] = []; // Initialize the array if it doesn't exist
    }
    acc[date].push(item); // Add the item to the array
    return acc;
  }, {});

  return (
    <>
      <div key={item.index} className="flex w-full flex-shrink flex-col">
        <>
          {Object.keys(days).map((day, index) => {
            const times: Times[] = days[day];

            const date = new Date(day);

            return (
              <React.Fragment key={day + index}>
                <p className="py-2 text-center font-bold capitalize">
                  {date.toLocaleDateString(navigator.language, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                <CarousellDetails times={times} />
              </React.Fragment>
            );
          })}
        </>
      </div>
    </>
  );
};
