"use client";
import { DayPicker, Matcher, Row, RowProps } from "react-day-picker";
import { differenceInCalendarDays, format } from "date-fns";
import nb from "date-fns/locale/nb";
import { useEffect, useState } from "react";
import { capitalize } from "lodash";
import { useSearchParamsToObject } from "app/hooks/use-search-params";
import { FormShape } from "app/components/sunchaser/components/filter-buttons/form";
import { useFormikContext } from "formik";

export const Calendar = ({ setIsCalendarExpanded }) => {
  const { values, setFieldValue } = useFormikContext<FormShape>();

  const [, setLocale] = useState("en-US");

  const today = new Date();
  const inTenDays = new Date(today.setDate(today.getDate() + 9));

  const disabledDays: Matcher | Matcher[] = {
    after: inTenDays,
  };

  useEffect(() => {
    setLocale(navigator.language);
  }, []);

  function pastDates(date: Date) {
    return differenceInCalendarDays(date, new Date()) < 0;
  }

  function afterTwoWeeks(date: Date) {
    return differenceInCalendarDays(date, new Date()) >= 14;
  }

  function OnlyFutureRow(props: RowProps) {
    const isPastRow = props.dates.every(pastDates);
    const isAfterTwoWeeks = props.dates.every(afterTwoWeeks);

    if (isPastRow) return <></>;
    if (isAfterTwoWeeks) return <></>;
    return <Row {...props} />;
  }

  const Submit = (e: Date) => {
    if (!e) return;

    setIsCalendarExpanded(false);
    setFieldValue("calendar", e);
  };

  type WeekDayNumb = 0 | 1 | 2 | 3 | 4 | 5 | 6;

  // TODO FIX CALENDAR SPACING ON DAYS
  return (
    <>
      <div className="flex justify-center">
        <DayPicker
          classNames={{
            day_selected: "daypicker-selected-date",
            day_today: "daypicker-today-date",
            months: "daypicker-months",
            day_outside: "daypicker-outside-date",
          }}
          weekStartsOn={new Date().getDay() as WeekDayNumb}
          disabled={disabledDays}
          defaultMonth={new Date()}
          components={{ Row: OnlyFutureRow }}
          locale={nb}
          disableNavigation
          mode="single"
          selected={values.calendar}
          onSelect={Submit}
          showOutsideDays
          fixedWeeks
          style={{
            margin: 0,
            // backgroundColor: `${theme.colors.green}`,
            // padding: "10px",
            // position: "absolute",
            // zIndex: 99,
            // boxShadow: "0 0 0 1px #6B93AA",
            // borderCollapse: "collapse",
            // tableLayout: "fixed",
            // width: "100%",
            // borderStyle: "hidden" /* hide standard table (collapsed) border */,
          }}
          formatters={{
            formatCaption: (date, options) => {
              // Format the date as you wish
              const formattedDateMonth = capitalize(
                format(date, "MMMM", options),
              );
              const formattedDateYear = capitalize(
                format(date, "yyyy", options),
              );
              return (
                <div className="flex w-full justify-between rounded-[16px] border-2 border-blues-700 bg-blues-500 p-4 text-white">
                  <p className="text-variant-poppins">{formattedDateMonth}</p>
                  <p className="text-variant-poppins">{formattedDateYear}</p>
                </div>
              );
            },
          }}
          styles={{
            caption_label: {
              width: "100%",
            },
            head: {
              fontSize: "1rem",
              fontWeight: "bold",
              color: "black",
            },
            table: {
              marginTop: "1rem",
              width: "100%",
              display: "table",
              borderCollapse: "separate",

              // borderWidth: "2px",
              // borderColor: `${theme.color.blues[7]}`,
              backgroundColor: `white`,
              boxShadow: "0 0 0 1px #6B93AA",
              // borderWidth: "2px",
              // border: "2px solid black",
              // borderWidth: "4px",
              borderStyle: "solid",
              maxWidth: "calc(var(--rdp-cell-size) * 8)",

              // backgroundColor: `${theme.color.blues[6]}`,
              // boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
              borderRadius: "16px",
              padding: "15px",
              color: "#2C5C32",
            },
            day: {
              width: "100%",
              fontSize: "1.2rem",
              color: "black",
              padding: "20px",
            },
          }}
        />
      </div>
    </>
  );
};
