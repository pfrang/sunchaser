import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ForecastDaysMappedData } from "pages/api/forecast/mapper/forecast-mapper";
import {
  useMediaQuery,
  useTheme,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import { ForecastTableRow } from "./forecast-row";

interface ForecastTableContainerProps {
  rows: ForecastDaysMappedData;
}

export const ForecastTableContainer = ({
  rows,
}: ForecastTableContainerProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "10px",
            },
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
