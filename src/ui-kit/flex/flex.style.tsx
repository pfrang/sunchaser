import styled from "styled-components";
import sscss from "@styled-system/css";
import {
  space,
  flexbox,
  color,
  layout,
  border,
  position,
  shadow,
} from "styled-system";

import { theme } from "../theme";

const Wrapper = styled.div<{ gap: number | number[]; clickable: boolean }>`
  ${flexbox}
  ${space}
  ${color}
  ${border}
  ${position}
  ${shadow}

  /* transition: all 500ms ease; */

  ${(props) =>
    sscss({
      width: "100%",
      display: "flex",
      gap: props.gap,
      cursor: props.clickable ? "pointer" : "default",
    })}

  ${layout}

  /* Add scrollbar styles */
    &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f157;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background: #004871;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #642222;
  }

  transition: ${({}) => {
      return "height";
    }}
    500ms ease;

  /* Add hover color effect */
  /* &:hover {
    opacity: ${(props) => props.clickable && "0.4"};
  } */
`;

export const FlexStyle = {
  Wrapper,
};
