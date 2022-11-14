import { FC } from "react";
import styled from "styled-components";

import { SpacerProps } from "../spacer/spacer";

export type DirectionChoice = "right" | "left";
interface Direction extends SpacerProps {
  direction: DirectionChoice;
}

const ArrowStyle = styled.svg`
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

export const Arrow: FC<Direction> = ({ direction, ...props }: Direction) => {
  switch (direction) {
    case "right":
      return (
        <ArrowStyle viewBox="0 0 16 16">
          <path
            d="M0.5 8L15.5 8"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.6787 3.5L15.5001 8L10.6787 12.5"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </ArrowStyle>
      );

    default:
      return (
        <ArrowStyle viewBox="0 0 16 16">
          <path
            d="M15.5 8L0.5 8"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.32129 12.5L0.49986 8L5.32129 3.5"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </ArrowStyle>
      );
  }
};
