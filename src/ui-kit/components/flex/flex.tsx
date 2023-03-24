import React, { ReactNode, CSSProperties, HTMLAttributes } from "react";
import {
  SpaceProps,
  FlexboxProps,
  ColorProps,
  LayoutProps,
  BorderProps,
  PositionProps,
} from "styled-system";

import { FlexStyle as s } from "./flex.style";

export interface FlexProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color">,
    ColorProps,
    SpaceProps,
    FlexboxProps,
    LayoutProps,
    BorderProps,
    PositionProps {
  children: ReactNode;
  gap?: number | number[];
  css?: CSSProperties;
  as?: "span" | "div" | "form";
  isHighlighted?: boolean;
}

export const Flex = ({ gap = 0, children, as, ...props }: FlexProps) => {
  const wrapperProps: Record<string, unknown> = props;
  return (
    <s.Wrapper as={as} gap={gap} {...wrapperProps}>
      {children}
    </s.Wrapper>
  );
};
