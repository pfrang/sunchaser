import sscss from "@styled-system/css";
import styled from "styled-components";
import {
  SpaceProps,
  ColorProps,
  BorderProps,
  GridProps,
  space,
  color,
  border,
  grid,
} from "styled-system";
import { theme } from "ui-kit/theme";

const Grid = styled.div<SpaceProps & ColorProps & BorderProps & GridProps>`
  /* ${sscss({
    gridTemplateColumns: [
      "repeat(4, 1fr)",
      "repeat(8, 1fr)",
      "repeat(12, 1fr)",
    ],
    columnGap: [4, 5],
    rowGap: 5,
    paddingX: [4, 5, 10],
  })} */
  /*
  overflow-y: hidden; */

  /* height: 100%; */

  width: 100%;
  margin: 0 auto;
  max-width: ${theme.maxContentWidth}px;
  display: grid;

  ${space}
  ${color}
  ${border}
  ${grid}
`;

export const GridStyle = {
  Grid,
};
