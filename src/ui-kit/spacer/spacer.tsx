import React, { FC, HTMLAttributes } from "react";

import { Wrapper } from "./spacer.style";

export interface SpacerProps extends HTMLAttributes<HTMLDivElement> {
  vertical?: number;
  horizontal?: number;
  debug?: boolean;
  line?: boolean;
}

export const Spacer: FC<SpacerProps> = ({
  vertical = 0,
  horizontal = 0,
  debug = false,
  line,
}) => {
  return (
    <Wrapper
      line={line}
      debug={debug}
      paddingTop={vertical}
      paddingRight={horizontal}
    />
  );
};
