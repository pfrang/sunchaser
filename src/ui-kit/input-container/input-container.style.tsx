import styled from "styled-components";
import { layout, LayoutProps, space, SpaceProps } from "styled-system";

import { theme } from "../theme";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: stretch;
  gap: ${theme.space[1]}px;

  ${layout};
  ${space}
`;

const TextRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const InputContainerStyle = {
  Wrapper,
  TextRow,
};
