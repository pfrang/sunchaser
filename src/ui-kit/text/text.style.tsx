import styled, { css } from "styled-components";
import { color, typography, variant, space, layout } from "styled-system";

import { Color } from "../theme";

import { TextVariant } from "./text.type";

// const variants = {
//   regular: css`
//     font-family: "SpaceMono";
//     font-weight: "400";
//     font-size:
//       [ "12px",
//       "16px",
//       "20px"];
//     line-height:
//       [ "28px",
//       "40px"];
//   `,
// };

export const TextWrapper = styled.p<{
  color?: Color;
  variant: TextVariant;
  $noWrap?: boolean;
}>`
  text-decoration: inherit;
  ${color}
  margin: 0;
  overflow-wrap: break-word;
  white-space: ${(props) => (props.$noWrap ? "nowrap" : "normal")};

  ${space};

  ${variant({
    variants: {
      regular: {
        fontFamily: "SpaceMono",
        fontWeight: "400",
        fontSize: ["12px", "16px", "20px"],
        lineHeight: ["28px", "40px"],
      },
      intro: {
        fontFamily: "SpaceMono",
        fontWeight: "400",
        fontSize: ["18px", "24px"],
        lineHeight: ["28px", "40px"],
      },
      ["subtitle-large"]: {
        fontFamily: "ProximaNova",
        fontWeight: "600",
        fontSize: ["18px", "20px", "22px"],
        lineHeight: ["28px", "30px", "32px"],
      },
      ["body-small"]: {
        fontFamily: "ProximaNova",
        fontWeight: "400",
        fontSize: ["12px", "16px", "18px"],
        lineHeight: ["24px", "24px", "28px"],
      },
      ["body-small-bold"]: {
        fontFamily: "ProximaNova",
        fontWeight: "600",
        fontSize: ["12px", "16px", "18px"],
        lineHeight: ["24px", "24px", "28px"],
      },
      ["body-large"]: {
        fontFamily: "ProximaNova",
        fontWeight: "400",
        fontSize: ["18px", "20px", "22px"],
        lineHeight: ["28px", "30px", "32px"],
      },
      ["body-large-bold"]: {
        fontFamily: "ProximaNova",
        fontWeight: "600",
        fontSize: ["18px", "20px", "22px"],
        lineHeight: ["28px", "30px", "32px"],
      },
      ["subtitle-small"]: {
        fontFamily: "ProximaNova",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "24px",
      },
      ["subtitle-small-bold"]: {
        fontFamily: "ProximaNova",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "24px",
      },
      poppins: {
        fontFamily: "Poppins",
        // fontWeight: "600",
        fontSize: ["18px", "20px", "22px"],
        lineHeight: ["28px", "30px", "32px"],
      },
      ["poppins-small"]: {
        fontFamily: "Poppins",
        // fontWeight: "600",
        fontSize: ["12px", "12px", "14px"],
        lineHeight: ["10px", "12px", "14px"],
      },
      search: {
        fontFamily: "SpaceMono",
        fontWeight: "400",
        fontSize: "15px",
        lineHeight: "24px",
      },
      caption: {
        fontFamily: "SpaceMono",
        fontWeight: "400",
        fontSize: "12px",
        lineHeight: "16px",
      },
      ["caption-large"]: {
        fontFamily: "SpaceMono",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "24px",
      },
      overline: {
        fontFamily: "SpaceMono",
        fontWeight: "700",
        fontSize: "11px",
        lineHeight: "16px",

        textTransform: "uppercase",
        letterSpacing: "0.02em",
      },
      button: {
        fontFamily: "SpaceMono",
        fontWeight: "700",
        fontSize: "16px",
        lineHeight: "24px",
      },
    },
  })}
  ${typography};
  ${layout};
`;
