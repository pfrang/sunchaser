import React from "react";

import { LinkWrapper } from "./link-content.style";

export interface LinkContentProps {
  children?: React.ReactNode;
  wrapWhitespace?: boolean;
  noUnderline?: boolean;
  icon?: React.ReactNode;
}

export const LinkContent = ({
  children,
  wrapWhitespace = false,
  noUnderline = false,
}: LinkContentProps) => {
  return (
    <LinkWrapper
      noUnderline={noUnderline}
      wrapWhitespace={wrapWhitespace}
      as="span"
    >
      {children}
    </LinkWrapper>
  );
};
