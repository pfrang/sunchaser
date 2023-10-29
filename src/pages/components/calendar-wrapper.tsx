import styled from "styled-components";

import { Flex } from "../../ui-kit/flex";
import { Text } from "../../ui-kit/text";
import { Spacer } from "../../ui-kit/spacer/spacer";

import { Calendar } from "./calendar";

const Div23 = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: white;
  text-align: center;
`;
export const CalendarWrapper = () => {
  return (
    <>
      <section id="calendar w-full relative">
        <Flex height={"100%"} alignItems={"center"} flexDirection={"column"}>
          <Spacer height={24} />
          <Div23>On what day do you want to travel?</Div23>
          <Spacer height={24} />
          <Calendar />
        </Flex>
      </section>
    </>
  );
};
