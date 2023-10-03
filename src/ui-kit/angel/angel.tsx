import { FC } from "react";
import styled from "styled-components";

import { SpacerProps } from "../spacer/spacer";
import { theme } from "../theme";

const AngelStyle = styled.svg`
  height: 24px;
  width: 24px;
  cursor: pointer;
`;

interface Direction extends SpacerProps {
  direction: DirectionChoice;
}

export type DirectionChoice = "left" | "down" | "right";

export const Angel: FC<Direction> = ({ direction, ...props }: Direction) => {
  switch (direction) {
    case "left":
      return (
        <AngelStyle>
          <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" />
        </AngelStyle>
      );

    case "down":
      return (
        <AngelStyle>
          <path
            d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"
            stroke={`${theme.color.white}`}
          />
        </AngelStyle>
      );
    case "right":
      return (
        <AngelStyle>
          <path d="M4 23.245l14.374-11.245L4 0.781l0.619-0.781 15.381 12-15.391 12-0.609-0.755z" />
        </AngelStyle>
      );
    default:
      throw new Error("Direction not supported");
  }
};
