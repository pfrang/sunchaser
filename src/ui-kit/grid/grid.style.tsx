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
  padding-left: 4px;

  column-gap: 4px;
  row-gap: 5px;

  grid-template-columns: repeat(4, 1fr);

  /* [ "repeat(4, 1fr)",
    "repeat(8, 1fr)",
    "repeat(12, 1fr)"]; */

  /* height: 100%; */

  width: 100%;
  margin: "0 auto";
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
