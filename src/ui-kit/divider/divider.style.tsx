import styled from "styled-components";
import { border, color, layout, space } from "styled-system";

export const Wrapper = styled.div<{
  color;
}>`
  width: 100%;

  box-sizing: border-box;
  border-style: solid;
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
  border-width: 1px;

  ${color}
  ${border}
  ${layout}
  ${space}
`;
