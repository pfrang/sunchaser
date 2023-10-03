/* eslint-disable no-console */
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import BaseDatePicker, {
  registerLocale,
  ReactDatePickerProps,
} from "react-datepicker";
import { nb } from "date-fns/locale";
import { isSameDay, isSameMonth, isSameYear, startOfToday } from "date-fns";
registerLocale("nb", nb);
import { LayoutProps } from "styled-system";

import { Text } from "../text";
import { InputContainer } from "../input-container/input-container";
import { CalendarIcon } from "../calendar-icon/calendar-icon";
import { Flex } from "../flex";

import { DatePickerStyle as s } from "./date-picker.style";

export interface DatePickerProps
  extends LayoutProps,
    Omit<ReactDatePickerProps, "onChange" | "value"> {
  label: string;
  errored?: boolean;
  locale?: string;
  onChange: (date: Date) => void;
  value?: Date;
  initialDateOnOpenCalendar?: Date;
  isDateBlocked: (date: Date) => boolean;
}

export const DatePicker = ({
  label,
  locale = "en",
  errored = false,
  onChange,
  onSelect,
  value,
  initialDateOnOpenCalendar,
  isDateBlocked,
  name,
  shouldCloseOnSelect = true,
  ...wrapperProps
}: DatePickerProps) => {
  const datePickerProps = { shouldCloseOnSelect };

  const [datePickerValue, setDatePickerValue] = React.useState<Date | null>(
    new Date()
  );
  const [rawInputValue, setRawInputValue] = React.useState<string>("");

  React.useEffect(() => {
    datePickerValue &&
      setRawInputValue(convertToHTMLCompliant(datePickerValue));
  }, [datePickerValue]);

  const isEqualToSelectedDate = (date: Date) =>
    !datePickerValue ||
    (isSameDay(date, datePickerValue) &&
      isSameMonth(date, datePickerValue) &&
      isSameYear(date, datePickerValue));

  return (
    <s.Wrapper>
      {/*
       // @ts-ignore */}
      <BaseDatePicker
        customInput={
          <div>
            <InputContainer
              label={{ text: label }}
              input={
                <Flex
                  border={2}
                  borderRadius={2}
                  position={"relative"}
                  width={["200px"]}
                >
                  <input
                    type="text"
                    onChange={(e) => {
                      setRawInputValue(e.target.value);
                    }}
                    placeholder="DD.MM.YYYY"
                    className="p-2"
                  />
                  <div
                    tabIndex={0}
                    className={`cursor-pointer absolute right-1 hover:bg-gray-300 rounded-lg`}
                  >
                    <CalendarIcon />
                  </div>
                </Flex>
              }
              width={["100%"]}
            />
          </div>
        }
        wrapperClassName="datePicker"
        filterDate={(date) => !isDateBlocked(date)}
        selected={datePickerValue}
        onChange={(date) => setDatePickerValue(date)}
        calendarContainer={s.Calendar}
        renderDayContents={(dayOfMonth: number, date: Date) => {
          const dayWrapped = (day: number) => (
            <Text
              variant="subtitle-small"
              padding={1}
              color={isDateBlocked(date) ? "graniteMedium" : undefined}
            >
              {day}
            </Text>
          );

          return isEqualToSelectedDate(date) ? (
            <s.SelectedDayWrapper>
              {dayWrapped(dayOfMonth)}
            </s.SelectedDayWrapper>
          ) : (
            <s.DayWrapper>{dayWrapped(dayOfMonth)}</s.DayWrapper>
          );
        }}
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => {
          const month = new Intl.DateTimeFormat(locale, {
            month: "long",
          }).format(date);
          const year = new Intl.DateTimeFormat(locale, {
            year: "numeric",
          }).format(date);

          return (
            <s.Header>
              <s.MonthSwitcher>
                <button onClick={decreaseMonth}>-</button>
                <Text
                  paddingX={3}
                  variant="subtitle-small-bold"
                >{`${month} ${year}`}</Text>
                <button onClick={increaseMonth}>+</button>
              </s.MonthSwitcher>
            </s.Header>
          );
        }}
        locale={locale === "no" ? "nb" : "en"}
        onCalendarOpen={() => {
          const selectedDate =
            datePickerValue || initialDateOnOpenCalendar || startOfToday();
          onChange(selectedDate);
        }}
        {...datePickerProps}
      />
    </s.Wrapper>
  );
};

const convertToHTMLCompliant = (date: Date): string => {
  try {
    // Fix for years less than 100
    if (date.getFullYear() < 100) {
      date.setFullYear(date.getFullYear());
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error("Error processing the date:", date);
    return "";
  }
};
