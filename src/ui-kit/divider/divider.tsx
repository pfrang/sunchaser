import React, { FC, HTMLAttributes } from "react";
import { BorderProps, LayoutProps, SpaceProps } from "styled-system";

import { Wrapper } from "./divider.style";

export interface DividerProps
  extends BorderProps,
    LayoutProps,
    SpaceProps,
    HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Divider: FC<DividerProps> = ({
  className,
  color = "violetDark",
  ...props
}) => {
  return <Wrapper color={color} className={className} {...props} />;
};
