import styled from "styled-components";

export const Wrapper = styled.span<Record<any, any>>`
  height: ${(props) => props.$height};
  min-height: ${(props) => props.$minHeight};
  max-height: ${(props) => props.$maxHeight};
  width: ${(props) => props.$width};
  min-width: ${(props) => props.$minWidth};
  border: ${(props) => props.$border};
  border-radius: ${(props) => props.$borderRadius};
  border-color: ${(props) => props.$borderColor};
  border-width: ${(props) => props.$borderWidth};
  border-style: ${(props) => props.$borderStyle};
  padding: ${(props) => props.$padding};
  padding-top: ${(props) => props.$paddingTop};

  margin: ${(props) => props.$margin};

  margin-top: ${(props) => props.$marginTop};
  margin-right: ${(props) => props.$marginRight};
  margin-bottom: ${(props) => props.$marginBottom};
  margin-left: ${(props) => props.$marginLeft};

  border-top: ${(props) => (props.$line ? "1px solid black" : "")};
  display: block;
  background-color: inherit;
  width: 100%;
`;
