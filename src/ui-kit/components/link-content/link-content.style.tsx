import styled from "styled-components";
import { space, layout } from "styled-system";

export const LinkWrapper = styled.span<{
  noUnderline: boolean;
  wrapWhitespace: boolean;
}>`
  text-decoration: ${(props) => (props.noUnderline ? "none" : "underline")};
  color: inherit;
  text-decoration-thickness: from-font;
  text-underline-offset: 2px;
  white-space: ${({ wrapWhitespace }) => !wrapWhitespace && "nowrap"};

  &:hover {
    text-decoration: none;
    cursor: pointer;
  }

  svg {
    position: relative;
    top: 2px;
    display: inline-block;
    margin-left: 2px;
  }
`;

export const SimpleLink = styled.a`
  text-decoration: "none";
  color: "inherit";

  ${space}
  ${layout}
`;
