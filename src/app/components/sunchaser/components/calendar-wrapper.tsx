"use client";
import styled from "styled-components";
import { FormShape } from "app/components/right-buttons-wrapper";
import { useFormikContext, Field } from "formik";
import { CalendarIcon } from "ui-kit/calendar-icon/calendar-icon";

import { Calendar } from "./calendar";

export const CalendarWrapper = ({ isExpanded }) => {
  const { values, setFieldValue, submitForm } = useFormikContext<FormShape>();

  return (
    <>
      <input
        autoFocus
        required
        disabled={!isExpanded}
        className={`bg-inherit ${
          isExpanded ? "" : "hidden"
        } size-full items-center text-ellipsis rounded-inherit pl-4 pr-6 text-2xl outline-none`}
        placeholder={isExpanded ? "DD.MM.YYY" : ""}
        type="text"
        name="calendar"
        onChange={(e) => setFieldValue("calendar", e.target.value)}
        style={{ outline: "none" }}
      />

      <div className="absolute right-2 top-[6px] flex size-[36px] cursor-pointer justify-center">
        <CalendarIcon />
      </div>
      {/* <section className="">
        <span className="block h-20"></span>
        <div className="flex h-full flex-col items-center">
          <Calendar />
        </div>
      </section> */}
    </>
  );
};
