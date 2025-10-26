"use client";
import { FormShape } from "app/components/sunchaser/components/filter-buttons/form";
import { useFormikContext } from "formik";
import { CalendarIcon } from "ui-kit/calendar-icon/calendar-icon";
import { useEffect, useRef, useState } from "react";
import { endOfDay } from "date-fns";
import { useIsFilterOpen, useIsSliding } from "states/states";

import { Calendar } from "../calendar";

export const CalendarWrapper = () => {
  const { isFilterOpen } = useIsFilterOpen();
  const { isSliding } = useIsSliding();
  const { values } = useFormikContext<FormShape>();
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);

  const wrapperRef = useRef<HTMLInputElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Handle click/touch outside to close calendar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsCalendarExpanded(false);
      }
    };

    if (isCalendarExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("touchstart", handleClickOutside);
      };
    }
  }, [isCalendarExpanded]);

  useEffect(() => {
    const handleFocusOut = (event: FocusEvent) => {
      // Check if the new focus target is outside the calendar wrapper
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.relatedTarget as Node)
      ) {
        setIsCalendarExpanded(false);
      }
    };

    const wrapperElement = wrapperRef.current;
    if (wrapperElement && isCalendarExpanded) {
      wrapperElement.addEventListener("focusout", handleFocusOut);

      return () => {
        wrapperElement.removeEventListener("focusout", handleFocusOut);
      };
    }
  }, [isCalendarExpanded]);

  // Handle escape key to close calendar
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isCalendarExpanded) {
        setIsCalendarExpanded(false);
        inputRef.current?.focus(); // Return focus to input
      }
    };

    if (isCalendarExpanded) {
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isCalendarExpanded]);

  // Close calendar when filter closes
  useEffect(() => {
    if (!isFilterOpen) {
      setIsCalendarExpanded(false);
    }
  }, [isFilterOpen]);

  const handleCalendarIconClick = () => {
    setIsCalendarExpanded(!isCalendarExpanded);
    if (!isCalendarExpanded) {
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();

      handleCalendarIconClick();
    }
  };
  return (
    <span
      className={`w-full rounded-inherit bg-white ${isSliding && "opacity-30"}`}
      ref={wrapperRef}
    >
      <input
        ref={inputRef}
        required
        readOnly
        disabled={!isFilterOpen}
        className={`bg-inherit ${
          isFilterOpen ? "" : "hidden"
        } size-full items-center text-ellipsis rounded-inherit pl-4 pr-6 text-lg outline-none focus:ring-2 focus:ring-greens-400`}
        value={
          isFilterOpen
            ? endOfDay(values.calendar).toISOString().split("T")[0]
            : ""
        }
        type="text"
        name="calendar"
        onFocus={() => setIsCalendarExpanded(true)}
        placeholder="Select a date"
        aria-label="Select a date"
        aria-expanded={isCalendarExpanded}
        aria-haspopup="dialog"
        style={{ outline: "none" }}
      />

      <div
        onClick={handleCalendarIconClick}
        onKeyDown={handleKeyDown}
        ref={calendarRef}
        role="button"
        aria-label={isCalendarExpanded ? "Close calendar" : "Open calendar"}
        className="absolute right-2 top-0 flex h-full cursor-pointer items-center rounded text-greens-400 focus:outline-none focus:ring-2 focus:ring-greens-400 size-[32px]"
      >
        <CalendarIcon />
      </div>
      {isCalendarExpanded && isFilterOpen && (
        <div className="flex h-full flex-col items-center">
          <Calendar setIsCalendarExpanded={setIsCalendarExpanded} />
        </div>
      )}
    </span>
  );
};
