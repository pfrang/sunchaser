import styled from "styled-components";
import sscss from "@styled-system/css";
import { space, flexbox, color, layout, border, position } from "styled-system";

import { theme } from "../../theme/theme";

const Wrapper = styled.div<{ gap: number | number[] }>`
  /* max-width: ${theme.maxContentWidth}px; */

  ${flexbox}
  ${space}
  ${color}
  ${border}
  ${position}

  transition: all 500ms ease;

  ${(props) =>
    sscss({
      width: "100%",
      display: "flex",
      gap: props.gap,
    })}

  ${layout}
`;

export const FlexStyle = {
  Wrapper,
};
