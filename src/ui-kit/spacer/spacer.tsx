import React, { FC, HTMLAttributes } from "react";
import { LayoutProps, SpaceProps } from "styled-system";
import { WidthProps } from "styled-system";

import { Wrapper } from "./spacer.style";

export interface SpacerProps
  extends HTMLAttributes<HTMLDivElement>,
    SpaceProps,
    LayoutProps {
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
  ...props
}) => {
  return <Wrapper line={line} {...props} />;
};
