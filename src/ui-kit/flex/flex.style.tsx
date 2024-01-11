import styled from "styled-components";
import {
  space,
  flexbox,
  color,
  layout,
  border,
  position,
  shadow,
} from "styled-system";

const Wrapper = styled.div<{
  gap: number | number[];
  $clickable: boolean;
  transition?: string;
}>`
  ${flexbox}
  ${space}
  ${color}
  ${border}
  ${position}
  ${shadow}

  /* transition: all 500ms ease; */

  transition: ${(props) => props.transition}; // Use transition prop

  width: 100%;
  display: flex;
  gap: ${(props) => props.gap};
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};

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

  /* transition: ${({}) => {
    return "height";
  }}
    500ms ease; */

  /* Add hover color effect */
  /* &:hover {
    opacity: ${(props) => props.$clickable && "0.4"};
  } */
`;

export const FlexStyle = {
  Wrapper,
};
