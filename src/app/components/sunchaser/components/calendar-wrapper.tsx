"use client";
import styled from "styled-components";

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
        <span className="block h-20"></span>
        <div className="flex h-full flex-col items-center">
          <Div23>On what day do you want to travel?</Div23>

          <span className="block h-4"></span>

          <Calendar />
        </div>
      </section>
    </>
  );
};
