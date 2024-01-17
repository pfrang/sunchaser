import styled from "styled-components";

export const BaseDiv = styled.div<Record<string, any>>`
  && {
    @media (min-width: 40em) {
      flex-direction: ${(props) =>
        props["$@media screen and (min-width: 40em)"]?.$flexDirection};
      width: ${(props) =>
        props["$@media screen and (min-width: 40em)"]?.$width};
      padding: ${(props) =>
        props["$@media screen and (min-width: 40em)"]?.$padding};
      padding-left: ${(props) =>
        props["$@media screen and (min-width: 40em)"]?.$paddingLeft};
      padding-right: ${(props) =>
        props["$@media screen and (min-width: 40em)"]?.$paddingRight};
    }

    @media (min-width: 52em) {
      flex-direction: ${(props) =>
        props["$@media screen and (min-width: 52em)"]?.$flexDirection};
      width: ${(props) =>
        props["$@media screen and (min-width: 52em)"]?.$width};
      padding: ${(props) =>
        props["$@media screen and (min-width: 52em)"]?.$padding};
      padding-left: ${(props) =>
        props["$@media screen and (min-width: 52em)"]?.$paddingLeft};
      padding-right: ${(props) =>
        props["$@media screen and (min-width: 52em)"]?.$paddingRight};
    }

    @media (min-width: 64em) {
      flex-direction: ${(props) =>
        props["$@media screen and (min-width: 64em)"]?.$flexDirection};
      width: ${(props) =>
        props["$@media screen and (min-width: 64em)"]?.$width};
      padding: ${(props) =>
        props["$@media screen and (min-width: 64em)"]?.$padding};
      padding-left: ${(props) =>
        props["$@media screen and (min-width: 64em)"]?.$paddingLeft};
      padding-right: ${(props) =>
        props["$@media screen and (min-width: 64em)"]?.$paddingRight};
    }
  }
`;
