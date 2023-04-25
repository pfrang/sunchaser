import React, { FC, HTMLAttributes, ReactNode, CSSProperties } from "react";
import {
  ColorProps,
  SpaceProps,
  TypographyProps,
  LayoutProps,
} from "styled-system";

import { Color } from "../../theme/theme";

import { TextWrapper } from "./text.style";
import { TextVariant } from "./text.type";

// TODO: refactor interface so one of children | content is accepted only
export interface TextProps
  extends ColorProps,
    SpaceProps,
    LayoutProps,
    TypographyProps,
    HTMLAttributes<HTMLParagraphElement> {
  tag?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: TextVariant;
  className?: string;
  content?: ReactNode;
  color?: Color;
  css?: CSSProperties;
  noWrap?: boolean;
}

export const Text: FC<TextProps> = ({
  tag = "p",
  variant = "body-large",
  className,
  content,
  color = "inherit",
  children,
  noWrap,
  ...props
}) => {
  return (
    <TextWrapper
      {...props}
      color={color}
      className={className}
      as={tag}
      variant={variant}
      noWrap={noWrap}
    >
      {content}
      {children}
    </TextWrapper>
  );
};
