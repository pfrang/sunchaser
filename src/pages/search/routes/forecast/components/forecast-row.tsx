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
import { ForecastDay } from "pages/api/forecast/mapper/forecast-mapper";
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
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
                    <TableRow key={day.overview.date + index}>
                      <ForecastRowDetails {...time} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
