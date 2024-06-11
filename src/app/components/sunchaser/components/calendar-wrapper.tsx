"use client";
import styled from "styled-components";
import { FormShape } from "app/components/right-buttons-wrapper";
import { useFormikContext, Field } from "formik";
import { CalendarIcon } from "ui-kit/calendar-icon/calendar-icon";
import { useState } from "react";

import { Calendar } from "./calendar";

export const CalendarWrapper = ({ isExpanded }) => {
  const { values, setFieldValue, submitForm } = useFormikContext<FormShape>();
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);

  return (
    <>
      <input
        required
        readOnly
        disabled={!isExpanded}
        className={`bg-inherit ${
          isExpanded ? "" : "hidden"
        } size-full items-center text-ellipsis rounded-inherit pl-4 pr-6 text-2xl outline-none focus:ring-2 focus:ring-greens-400`}
        placeholder={isExpanded ? values.calendar : ""}
        type="text"
        name="calendar"
        onFocus={() => setIsCalendarExpanded(true)}
        onBlur={() => setIsCalendarExpanded(false)}
        // onChange={(e) => setFieldValue("calendar", e.target.value)}
        style={{ outline: "none" }}
      />

      <div className="absolute right-2 top-[6px] flex size-[36px] cursor-pointer justify-center">
        <CalendarIcon />
      </div>
      {isCalendarExpanded && isExpanded && (
        <section className="">
          <div className="flex h-full flex-col items-center">
            <Calendar />
          </div>
        </section>
      )}
    </>
  );
};
