"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ForecastDaysMappedData } from "app/api/forecast/mapper/forecast-mapper";
import { createTheme, ThemeProvider } from "@mui/material";

import { ForecastTableRow } from "./forecast-row";

interface ForecastTableContainerProps {
  rows: ForecastDaysMappedData;
}

export const ForecastTableContainer = ({
  rows,
}: ForecastTableContainerProps) => {
  const theme2 = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme2}>
        <TableContainer
          component={Paper}
          sx={{
            display: "flex",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <Table sx={{ height: "100%" }} aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="center">Dato&nbsp;</TableCell>
                <TableCell align="center">Maks/min Temp&nbsp;</TableCell>
                <TableCell align="center">Nedbør&nbsp;</TableCell>
                <TableCell align="center">Vind&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(rows).map((row) => (
                <ForecastTableRow key={row} day={rows[row]} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </>
  );
};
