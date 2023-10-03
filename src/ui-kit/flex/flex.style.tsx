import styled from "styled-components";
import sscss from "@styled-system/css";
import { space, flexbox, color, layout, border, position } from "styled-system";

import { theme } from "../theme";

const Wrapper = styled.div<{ gap: number | number[] }>`
  ${flexbox}
  ${space}
  ${color}
  ${border}
  ${position}

  /* transition: all 500ms ease; */

  ${(props) =>
    sscss({
      width: "100%",
      display: "flex",
      gap: props.gap,
    })}

  ${layout}

  transition: ${({}) => {
    return "height";
  }} 500ms ease
`;

export const FlexStyle = {
  Wrapper,
};
