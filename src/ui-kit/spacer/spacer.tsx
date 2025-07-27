import React from "react";
import clsx from "clsx";

interface SpacerProps {
  line?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Wrapper: React.FC<SpacerProps> = ({
  line,
  className,
  children,
}) => (
  <span
    className={clsx(
      "block w-full bg-inherit",
      line && "border-t border-black",
      className,
    )}
  >
    {children}
  </span>
);
