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

export const Spacer: FC<SpacerProps> = ({ line, ...props }) => {
  return <Wrapper line={line} {...props} />;
};
