import styled from "styled-components";
import { layout, space } from "styled-system";

export const Wrapper = styled.span<{
  line;
}>`
  ${space};
  ${layout};
  border-top: ${(props) => (props.line ? "1px solid black" : "")};
  display: block;
  background-color: inherit;
  width: 100%;
`;
