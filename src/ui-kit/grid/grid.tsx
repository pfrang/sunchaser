import React, { ReactNode } from "react";
import {
  SpaceProps,
  ColorProps,
  BorderProps,
  GridProps as StyledGridProps,
} from "styled-system";

import { GridStyle as s } from "./grid.style";

export interface GridProps
  extends SpaceProps,
    ColorProps,
    BorderProps,
    StyledGridProps {
  children: ReactNode;
}

export const Grid = ({ children, ...props }: GridProps) => {
  //SHOULD BE Record<string, uknown> = props
  const wrapperProps: Record<any, any> = props;
  return <s.Grid {...wrapperProps}>{children}</s.Grid>;
};
