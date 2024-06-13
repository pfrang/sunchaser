"use client";
import styled from "styled-components";
import { FormShape } from "app/components/right-buttons-wrapper";
import { useFormikContext, Field } from "formik";
import { CalendarIcon } from "ui-kit/calendar-icon/calendar-icon";
import { useEffect, useRef, useState } from "react";
import { endOfDay } from "date-fns";

import { Calendar } from "./calendar";

export const CalendarWrapper = ({ isExpanded }) => {
  const { values } = useFormikContext<FormShape>();
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);

  const wrapperRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsCalendarExpanded(false);
      }
    };

    const addEventListeners = () => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };

    if (isCalendarExpanded) {
      addEventListeners();
    } else {
      removeEventListeners();
    }

    return () => {
      removeEventListeners();
    };
  }, [isCalendarExpanded, wrapperRef]);

  return (
    <span className="rounded-inherit" ref={wrapperRef}>
      <input
        required
        readOnly
        disabled={!isExpanded}
        className={`bg-inherit ${
          isExpanded ? "" : "hidden"
        } size-full items-center text-ellipsis rounded-inherit pl-4 pr-6 text-2xl outline-none focus:ring-2 focus:ring-greens-400`}
        placeholder={
          isExpanded
            ? endOfDay(values.calendar).toISOString().split("T")[0]
            : ""
        }
        type="text"
        name="calendar"
        onFocus={() => setIsCalendarExpanded(true)}
        // onChange={(e) => setFieldValue("calendar", e.target.value)}
        style={{ outline: "none" }}
      />

      <div className="absolute right-2 top-[6px] flex size-[36px] cursor-pointer justify-center">
        <CalendarIcon />
      </div>
      {isCalendarExpanded && isExpanded && (
        <div className="flex h-full flex-col items-center">
          <Calendar setIsCalendarExpanded={setIsCalendarExpanded} />
        </div>
      )}
    </span>
  );
};
