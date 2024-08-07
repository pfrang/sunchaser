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

import { JSToCSS } from "../utils/js-to-css";

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
  transition?: string; // Add this line
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ gap = 0, clickable = false, transition, children, ...props }, ref) => {
    //SHOULD BE Record<string, uknown> = props
    const wrapperProps: Record<any, any> = JSToCSS(props);

    return (
      <s.Wrapper
        ref={ref}
        $gap={gap}
        $transition={transition}
        $clickable={clickable}
        {...wrapperProps}
      >
        {children}
      </s.Wrapper>
    );
  },
);
