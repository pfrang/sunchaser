import { FC, HTMLAttributes, ReactElement } from "react";
import { LayoutProps, SpaceProps } from "styled-system";

import { Text } from "..//text";

import { InputContainerStyle as s } from "./input-container.style";

export interface InputContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    LayoutProps,
    SpaceProps {
  label?: { for?: string; text: string } | ReactElement;
  helperText?: string;
  errorText?: string;
  errored?: boolean;
  disabled?: boolean;
  optional?: string;
  input: ReactElement;
  tooltipText?: string;
}

const isReactElement = (value: ReactElement | any): value is ReactElement => {
  return (value as ReactElement).type !== undefined;
};

export const InputContainer: FC<InputContainerProps> = ({
  label,
  helperText = "",
  errorText = "",
  tooltipText = "",
  errored = false,
  disabled = false,
  optional = false,
  input,
  ...props
}) => {
  return (
    <s.Wrapper {...props}>
      {(label || optional) && (
        <s.TextRow>
          {isReactElement(label)
            ? label
            : label && (
                <label htmlFor={label.for ?? ""}>
                  <Text
                    content={label.text}
                    variant="subtitle-small-bold"
                    color={disabled ? "graniteMedium" : "violetDark"}
                  />
                </label>
              )}
          <Text
            content={optional}
            variant="subtitle-small"
            color={disabled ? "graniteMedium" : "graniteMediumDark"}
          />
        </s.TextRow>
      )}
      {input}
      {(helperText || errorText) && (
        <s.TextRow>
          <Text
            content={errored ? errorText : helperText}
            variant="caption"
            color={
              disabled
                ? "graniteMedium"
                : errored
                  ? "redText"
                  : "graniteMediumDark"
            }
          />
        </s.TextRow>
      )}
    </s.Wrapper>
  );
};
