import React, {
  ReactNode,
  CSSProperties,
  HTMLAttributes,
  forwardRef,
} from "react";
import {
  SpaceProps,
  FlexboxProps,
  ColorProps,
  LayoutProps,
  BorderProps,
  PositionProps,
  ShadowProps,
} from "styled-system";

import { FlexStyle as s } from "./flex.style";

export interface FlexProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color">,
    ColorProps,
    ShadowProps,
    SpaceProps,
    FlexboxProps,
    LayoutProps,
    BorderProps,
    PositionProps {
  children: ReactNode;
  gap?: number | number[];
  css?: CSSProperties;
  isHighlighted?: boolean;
  as?: keyof JSX.IntrinsicElements; // Add this line
  clickable?: boolean;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ gap = 0, clickable = false, children, ...props }, ref) => {
    //SHOULD BE Record<string, uknown> = props
    const wrapperProps: Record<any, any> = props;
    return (
      <s.Wrapper ref={ref} gap={gap} clickable={clickable} {...wrapperProps}>
        {children}
      </s.Wrapper>
    );
  },
);
