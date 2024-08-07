"use client";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import { ForecastDay } from "app/api/forecast/mapper/forecast-mapper";
import React from "react";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { ForecastRowDetails } from "./forecast-details-row";

interface ForecastTableRowProps {
  day: ForecastDay;
}

export const ForecastTableRow = ({ day }: ForecastTableRowProps) => {
  const [open, setOpen] = useState(false);

  const { overview } = day;

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* @ts-ignore*/}
        <TableCell align="center" component="th" scope="row">
          {new Date(overview.date).toLocaleDateString()}
        </TableCell>
        <TableCell align="center">
          {overview.maxTemp} / {overview.minTemp}
        </TableCell>
        <TableCell align="center">
          {overview.summarizedRain.toFixed(2)}
        </TableCell>
        <TableCell align="center">{overview.averageWind.toFixed(2)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ borderBottom: "unset" }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detaljer
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Tid</TableCell>
                    <TableCell align="center">Vær</TableCell>
                    <TableCell align="center">Temperatur</TableCell>
                    <TableCell align="center">Nedbør mm</TableCell>
                    <TableCell align="center">Vind m/s</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {day.times.map((time, index) => (
                    <TableRow
                      sx={{
                        height: "32px",
                      }}
                      key={day.overview.date + index}
                    >
                      <ForecastRowDetails {...time} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
