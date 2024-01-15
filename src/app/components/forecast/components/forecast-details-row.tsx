"use client";
import { TableCell } from "@mui/material";
import Image from "next/image";
import { ForecastTime } from "app/api/forecast/mapper/forecast-mapper";
import React from "react";
import { WeatherIconList } from "ui-kit/weather-svg-ref/weather-icon-list";

interface ForecastTableRowProps extends ForecastTime {}

export const ForecastRowDetails = ({
  time,
  temperature,
  rain,
  wind,
  symbol,
}: ForecastTableRowProps) => {
  const icon =
    symbol &&
    WeatherIconList[symbol.charAt(0)?.toUpperCase() + symbol?.slice(1)];

  return (
    <>
      <TableCell align="center" scope="row">
        {time}
      </TableCell>
      <TableCell align="center" scope="row">
        <div className="flex w-full justify-center">
          {icon ? (
            <Image
              alt="partlySunny"
              src={`/icons/black/svg/${icon}`}
              width={32}
              height={32}
            />
          ) : (
            <></>
          )}
        </div>
      </TableCell>
      <TableCell align="center">{temperature}</TableCell>
      <TableCell align="center">{rain}</TableCell>
      <TableCell align="center">{wind}</TableCell>
    </>
  );
};
