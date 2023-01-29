import styled from "styled-components";
import { space } from "styled-system";

export const Wrapper = styled.span<{
  paddingTop: number;
  paddingRight: number;
  debug: boolean;
  line;
}>`
  ${space};
  border-top: ${(props) => (props.line ? "2px solid black" : "")};
  display: block;
  width: 100%;
  height: 0;
`;
