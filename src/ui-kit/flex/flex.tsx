import React, { ReactNode, CSSProperties, HTMLAttributes } from "react";
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

export const Flex = ({
  gap = 0,
  clickable = false,
  children,
  ...props
}: FlexProps) => {
  //SHOULD BE Record<string, uknown> = props
  const wrapperProps: Record<any, any> = props;
  return (
    <s.Wrapper gap={gap} clickable={clickable} {...wrapperProps}>
      {children}
    </s.Wrapper>
  );
};
