import styled from "styled-components";

type Direction = "right" | "left";

const ArrowStyle = styled.svg`
  height: 30px;
  width: 30px;
`;

export const Arrow = (direction: Direction) => {
  switch (direction) {
    case "right":
      return (
        <ArrowStyle viewBox="0 0 16 16">
          <path
            d="M0.5 8L15.5 8"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </ArrowStyle>
      );

    default:
      return (
        <ArrowStyle viewBox="0 0 16 16">
          <path
            d="M5.32129 12.5L0.49986 8L5.32129 3.5"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </ArrowStyle>
      );
  }
};
