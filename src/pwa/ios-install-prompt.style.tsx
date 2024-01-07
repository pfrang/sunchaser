import styled from "styled-components";
import sscss from "@styled-system/css";
import { theme } from "ui-kit/theme";

const PromptWrapper = styled.div`
  width: 100%;
  z-index: 100;
  position: fixed;
  bottom: 0;
  display: "block";
`;

const Prompt = styled.div`
  background-color: ${theme.color.green[4]};
  ${sscss({ p: 4, borderRadius: "xl" })};
  font-weight: bold;
  color: black;
  font-size: 16px;
  line-height: 24px;
`;

const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 30px 30px 0 30px;
  margin: auto;
  margin-top: -1px;
  border-color: ${theme.color.green[4]} transparent transparent transparent;
`;

export const IosInstallPromptStyles = {
  PromptWrapper,
  ArrowDown,
  Prompt,
};
