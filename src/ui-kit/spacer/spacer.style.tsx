import styled from "styled-components";
import { space } from "styled-system";

export const Wrapper = styled.span<{
  paddingTop: number;
  paddingRight: number;
  debug: boolean;
}>`
  ${space};
  display: block;
  width: 0;
  height: 0;
`;
