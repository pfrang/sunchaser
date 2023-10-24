import React, { FC, HTMLAttributes } from "react";
import {
  BorderProps,
  LayoutProps,
  SpaceProps,
  ShadowProps,
} from "styled-system";

import { Wrapper } from "./spacer.style";

export interface SpacerProps
  extends HTMLAttributes<HTMLDivElement>,
    SpaceProps,
    ShadowProps,
    LayoutProps,
    BorderProps {
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
