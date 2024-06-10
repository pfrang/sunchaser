import styled from "styled-components";

import { BaseDiv } from "../base/base.style";

const Wrapper = styled(BaseDiv)`
  /* transition: all 500ms ease; */

  width: 100%;
  display: flex;

  max-width: ${(props) => props.$maxWidth};
  width: ${(props) => props.$width};
  z-index: ${(props) => props.$zIndex};

  transition: ${(props) => props.$transition};
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
  flex-direction: ${(props) => props.$flexDirection};
  flex-wrap: ${(props) => props.$flexWrap};
  flex-grow: ${(props) => props.$flexGrow};
  flex-shrink: ${(props) => props.$flexShrink};
  flex-basis: ${(props) => props.$flexBasis};
  flex: ${(props) => props.$flex};
  justify-content: ${(props) => props.$justifyContent};
  align-items: ${(props) => props.$alignItems};
  align-content: ${(props) => props.$alignContent};
  order: ${(props) => props.$order};
  align-self: ${(props) => props.$alignSelf};
  justify-self: ${(props) => props.$justifySelf};
  place-content: ${(props) => props.$placeContent};
  place-items: ${(props) => props.$placeItems};
  height: ${(props) => props.$height};
  transition: ${(props) => props.$transition}; // Use transition prop
  gap: ${(props) => props.$gap};

  position: ${(props) => props.$position};
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  right: ${(props) => props.$right};
  bottom: ${(props) => props.$bottom};

  z-index: ${(props) => props.$zIndex};

  border: ${(props) => props.$border};
  border-radius: ${(props) => props.$borderRadius};
  border-color: ${(props) => props.$borderColor};
  border-width: ${(props) => props.$borderWidth};

  color: ${(props) => props.$color};
  background-color: ${(props) => props.$backgroundColor};

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
`;

export const FlexStyle = {
  Wrapper,
};
