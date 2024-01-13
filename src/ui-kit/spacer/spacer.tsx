import React, { FC, HTMLAttributes } from "react";
import {
  BorderProps,
  LayoutProps,
  SpaceProps,
  ShadowProps,
} from "styled-system";

import { JSToCSS } from "../utils/js-to-css";

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
  const wrapperProps: Record<any, any> = JSToCSS(props);

  return <Wrapper $line={line} {...wrapperProps} />;
};
